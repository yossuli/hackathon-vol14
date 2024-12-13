import type { Prisma } from '@prisma/client';
import type { MaybeId } from 'common/types/brandedId';
import type { FireFlowerDto, FireFlowerUpdateVal } from 'common/types/fireFlower';
import type { StrictOmit } from 'common/types/utils';
import type { UserEntity } from 'domain/user/model/userType';
import type { EntityId } from 'service/brandedId';

export type FireFlowerEntity = StrictOmit<FireFlowerDto, 'id' | 'creator' | 'structure'> & {
  id: EntityId['fireFlower'];
  creator: FireFlowerDto['creator'] & { id: EntityId['user'] };
  structure: Prisma.InputJsonValue;
};

export type LikedFireFlowerEntity = {
  id: EntityId['likedFireFlower'];
  userId: EntityId['user'];
  fireFlowerId: EntityId['fireFlower'];
  likedAt: number;
  suggestedUserId?: EntityId['user'];
};

export type LikedFireFlowerDeleteServerVal = Pick<LikedFireFlowerEntity, 'id' | 'userId'>;

export type LikedFireFlowerDeleteVal = {
  deletable: boolean;
  likedFireFlowerId: EntityId['likedFireFlower'];
};

export type FireFlowerCreateServerVal = {
  name: string;
};

export type FireFlowerUpdateServerVal = FireFlowerUpdateVal & {
  fireFlowerId: MaybeId['fireFlower'];
};

export type FireFlowerSaveVal = { savable: boolean; fireFlower: FireFlowerEntity };

export type FireFlowerDeleteVal = { deletable: boolean; fireFlower: FireFlowerEntity };

export type FoundRandomServerVal = {
  user: UserEntity;
  found: boolean;
};
