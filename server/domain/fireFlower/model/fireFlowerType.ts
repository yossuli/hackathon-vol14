import type { FireFlower, FireFlowerDto } from 'common/types/fireFlower';
import type { EntityId } from 'service/brandedId';

export type FireFlowerEntity = Omit<FireFlowerDto, 'id' | 'creator'> & {
  id: EntityId['fireFlower'];
  creator: Omit<FireFlowerDto['creator'], 'id'> & { id: EntityId['user'] };
};

export type FireFlowerCreateServerVal = {
  name: string;
  structure: FireFlower;
};

export type FireFlowerSaveVal = { fireFlower: FireFlowerEntity };

export type FireFlowerDeleteVal = { deletable: boolean; fireFlower: FireFlowerEntity };
