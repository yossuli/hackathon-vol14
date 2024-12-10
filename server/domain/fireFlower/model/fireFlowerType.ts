import type { Prisma } from '@prisma/client';
import type { MaybeId } from 'common/types/brandedId';
import type { FireFlowerDto, FireFlowerUpdateVal } from 'common/types/fireFlower';
import type { StrictOmit } from 'common/types/utils';
import type { EntityId } from 'service/brandedId';

export type FireFlowerEntity = StrictOmit<FireFlowerDto, 'id' | 'creator' | 'structure'> & {
  id: EntityId['fireFlower'];
  creator: FireFlowerDto['creator'] & { id: EntityId['user'] };
  structure: Prisma.InputJsonValue;
};
};

export type FireFlowerCreateServerVal = {
  name: string;
};

export type FireFlowerUpdateServerVal = FireFlowerUpdateVal & {
  fireFlowerId: MaybeId['fireFlower'];
};

export type FireFlowerSaveVal = { savable: boolean; fireFlower: FireFlowerEntity };

export type FireFlowerDeleteVal = { deletable: boolean; fireFlower: FireFlowerEntity };
