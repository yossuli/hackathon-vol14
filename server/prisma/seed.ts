import type { Prisma } from '@prisma/client';
import { prismaClient, transaction } from 'service/prismaClient';

const sampleUserId = 'sampleUserId';
//eslint-disable-next-line
const randomHexRGB = () => {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${hex.padStart(6, '0')}`;
};
//eslint-disable-next-line
const randomStrucutre = () => {
  const colors = Array.from({ length: 4 }, () => randomHexRGB());
  return Array.from({ length: 7 }, (_, j) =>
    Array.from({ length: 7 }, (_, i) => colors[Math.max(Math.abs(j - 3), Math.abs(i - 3))]),
  );
};

const sampleFireworks = Array.from({ length: 20 }, (_, i) => ({
  name: `sample${i}`,
  structure: randomStrucutre(),
  creatorId: sampleUserId,
}));

const seedSampleFireworks = async (tx: Prisma.TransactionClient): Promise<void> => {
  // サンプルユーザーが存在するか確認
  const existingUser = await tx.user.findUnique({
    where: { id: sampleUserId },
  });

  // サンプルユーザーが存在しない場合のみ作成
  if (!existingUser) {
    await tx.user.create({
      data: {
        id: sampleUserId,
        email: 'sample@example.com',
        signInName: 'sampleUser',
        createdAt: new Date(),
      },
    });
  }

  // サンプル花火を作成
  for (const firework of sampleFireworks) {
    await tx.fireFlower.create({
      data: firework,
    });
  }
};

transaction('RepeatableRead', (tx): Promise<void[]> => Promise.all([seedSampleFireworks(tx)]))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async (): Promise<void> => {
    await prismaClient.$disconnect();
  });
