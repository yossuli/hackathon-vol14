import assert from 'assert';
import type { FireFlowerUpdateVal } from 'common/types/fireFlower';
import type { UserDto } from 'common/types/user';
import { fireFlowerNameValidator, prismaFireFlowerValidator } from 'common/validators/fireFlower';
import { brandedId } from 'service/brandedId';
import { ulid } from 'ulid';
import type {
  FireFlowerCreateServerVal,
  FireFlowerEntity,
  FireFlowerSaveVal,
} from './fireFlowerType';

export const fireFlowerMethod = {
  create: (user: UserDto, val: FireFlowerCreateServerVal): FireFlowerSaveVal => {
    const fireFlower: FireFlowerEntity = {
      id: brandedId.fireFlower.entity.parse(ulid()),
      name: fireFlowerNameValidator.parse(val.name),
      createdAt: Date.now(),
      updatedAt: undefined,
      structure: prismaFireFlowerValidator.parse(Array(7).fill(Array(7).fill(null))),
      creator: { id: brandedId.user.entity.parse(user.id), signInName: user.signInName },
    };
    return { fireFlower };
  },
  update: (
    user: UserDto,
    fireFlower: FireFlowerEntity,
    val: FireFlowerUpdateVal,
  ): FireFlowerSaveVal => {
    assert(user.id === String(fireFlower.creator.id));
    if (val.structure) {
      return {
        fireFlower: { ...fireFlower, structure: prismaFireFlowerValidator.parse(val.structure) },
      };
    }
    if (val.name) {
      return { fireFlower: { ...fireFlower, name: val.name } };
    }
    return { fireFlower: { ...fireFlower } };
  },
  find: (fireFlower: FireFlowerEntity): { found: boolean; fireFlower: FireFlowerEntity } => {
    return { found: true, fireFlower };
  },
  findMany: (
    fireFlowers: FireFlowerEntity[],
  ): { found: boolean; fireFlowers: FireFlowerEntity[] } => {
    return {
      found: fireFlowers.every((fireFlower) => fireFlowerMethod.find(fireFlower).found),
      fireFlowers,
    };
  },
  delete: (
    user: UserDto,
    fireFlower: FireFlowerEntity,
  ): { deletable: boolean; fireFlower: FireFlowerEntity } => {
    assert(user.id === String(fireFlower.creator.id));
    return { deletable: true, fireFlower };
  },
};
