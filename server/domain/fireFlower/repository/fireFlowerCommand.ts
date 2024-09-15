import type { Prisma } from '@prisma/client';
import assert from 'assert';
import type { FireFlowerSaveVal } from '../model/fireFlowerType';

export const fireFlowerCommand = {
  save: async (tx: Prisma.TransactionClient, val: FireFlowerSaveVal): Promise<void> => {
    await tx.fireFlower.upsert({
      where: { id: val.fireFlower.id },
      update: {
        name: val.fireFlower.name,
        updatedAt: val.fireFlower.updatedAt ? new Date(val.fireFlower.updatedAt) : undefined,
        structure: val.fireFlower.structure,
      },
      create: {
        id: val.fireFlower.id,
        name: val.fireFlower.name,
        structure: val.fireFlower.structure,
        createdAt: new Date(val.fireFlower.createdAt),
        updatedAt: undefined,
        creatorId: val.fireFlower.creator.id,
      },
    });
  },
  delete: async (
    tx: Prisma.TransactionClient,
    val: { deletable: boolean; fireFlower: FireFlowerSaveVal['fireFlower'] },
  ): Promise<void> => {
    assert(val.deletable);

    await tx.fireFlower.delete({ where: { id: val.fireFlower.id } });
  },
};
