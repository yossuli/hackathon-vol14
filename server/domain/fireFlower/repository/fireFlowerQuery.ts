import type { fireFlower, Prisma, User } from '@prisma/client';
import type { FireFlowerFindVal } from 'common/types/fireFlower';
import { fireFlowerValidator } from 'common/validators/fireFlower';
import { brandedId } from 'service/brandedId';
import type { FireFlowerEntity } from '../model/fireFlowerType';

const toEntity = (prismaFireFlower: fireFlower & { Creator: User }): FireFlowerEntity => ({
  id: brandedId.fireFlower.entity.parse(prismaFireFlower.id),
  name: prismaFireFlower.name,
  createdAt: prismaFireFlower.createdAt.getTime(),
  updatedAt: prismaFireFlower.updatedAt?.getTime() ?? undefined,
  structure: fireFlowerValidator.parse(prismaFireFlower.structure),
  creator: {
    id: brandedId.user.entity.parse(prismaFireFlower.creatorId),
    signInName: prismaFireFlower.Creator.signInName,
  },
});
const listByCreatedAt = async (
  tx: Prisma.TransactionClient,
  limit?: number,
): Promise<FireFlowerEntity[]> => {
  const prismaFireFlowers = await tx.fireFlower.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: { Creator: true },
  });

  return prismaFireFlowers.map(toEntity);
};

export const fireFlowerQuery = {
  listByCreatedAt,
  findById: async (tx: Prisma.TransactionClient, fireFlowerId: string): Promise<FireFlowerEntity> =>
    tx.fireFlower
      .findUniqueOrThrow({ where: { id: fireFlowerId }, include: { Creator: true } })
      .then(toEntity),

  // eslint-disable-next-line complexity
  findByQuery: async (
    tx: Prisma.TransactionClient,
    query: FireFlowerFindVal,
  ): Promise<FireFlowerEntity[]> => {
    const prismaFireFlowers = await tx.fireFlower.findMany({
      where: {
        id: query.id ? brandedId.fireFlower.entity.parse(query.id) : undefined,
        name: query.name,
        createdAt: query.createdAt ? new Date(query.createdAt) : undefined,
        updatedAt: query.updatedAt ? new Date(query.updatedAt) : undefined,
        creatorId: query.creatorId ? brandedId.user.entity.parse(query.creatorId) : undefined,
      },
      include: { Creator: true },
    });

    return prismaFireFlowers.map(toEntity);
  },
};
