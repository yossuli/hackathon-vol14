import assert from 'assert';
import type { DtoId } from 'common/types/brandedId';
import type { FireFlowerUpdateVal } from 'common/types/fireFlower';
import type { UserDto } from 'common/types/user';
import { fireFlowerNameValidator, fireFlowerValidator } from 'common/validators/fireFlower';
import { brandedId } from 'service/brandedId';
import { ulid } from 'ulid';
import type {
  FireFlowerCreateServerVal,
  FireFlowerEntity,
  FireFlowerSaveVal,
  LikedFireFlowerDeleteServerVal,
  LikedFireFlowerDeleteVal,
  LikedFireFlowerEntity,
} from './fireFlowerType';

export const fireFlowerMethod = {
  create: (user: UserDto, val: FireFlowerCreateServerVal): FireFlowerSaveVal => {
    const fireFlower: FireFlowerEntity = {
      id: brandedId.fireFlower.entity.parse(ulid()),
      name: fireFlowerNameValidator.parse(val.name),
      createdAt: Date.now(),
      updatedAt: undefined,
      structure: fireFlowerValidator.parse(Array(7).fill(Array(7).fill(null))),
      creator: { id: brandedId.user.entity.parse(user.id), signInName: user.signInName },
    };
    return { savable: true, fireFlower };
  },
  update: (
    user: UserDto,
    fireFlower: FireFlowerEntity,
    val: FireFlowerUpdateVal,
  ): FireFlowerSaveVal => {
    assert(user.id === String(fireFlower.creator.id));
    if (val.structure) {
      return {
        savable: true,
        fireFlower: { ...fireFlower, structure: fireFlowerValidator.parse(val.structure) },
      };
    }
    if (val.name) {
      return {
        savable: true,
        fireFlower: { ...fireFlower, name: val.name },
      };
    }
    return {
      savable: false,
      fireFlower,
    };
  },
  delete: (
    user: UserDto,
    fireFlower: FireFlowerEntity,
  ): { deletable: boolean; fireFlower: FireFlowerEntity } => {
    assert(user.id === String(fireFlower.creator.id));
    return { deletable: true, fireFlower };
  },
  like: {
    create: (user: UserDto, fireFlowerId: DtoId['fireFlower']): LikedFireFlowerEntity => {
      const likedFireFlower: LikedFireFlowerEntity = {
        id: brandedId.likedFireFlower.entity.parse(ulid()),
        userId: brandedId.user.entity.parse(user.id),
        fireFlowerId: brandedId.fireFlower.entity.parse(fireFlowerId),
        likedAt: Date.now(),
      };
      return likedFireFlower;
    },
    delete: (
      user: UserDto,
      likedFireFlower: LikedFireFlowerDeleteServerVal,
    ): LikedFireFlowerDeleteVal => {
      assert(user.id === String(likedFireFlower.userId));
      return { deletable: true, likedFireFlowerId: likedFireFlower.id };
    },
  },
};
