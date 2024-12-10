import type { FireFlowerDto } from 'common/types/fireFlower';
import { fireFlowerValidator } from 'common/validators/fireFlower';
import { brandedId } from 'service/brandedId';
import type { FireFlowerEntity } from '../model/fireFlowerType';

export const toFireFlowerDto = (fireFlower: FireFlowerEntity): FireFlowerDto => ({
  id: brandedId.fireFlower.dto.parse(fireFlower.id),
  name: fireFlower.name,
  createdAt: fireFlower.createdAt,
  updatedAt: fireFlower.updatedAt,
  structure: fireFlowerValidator.parse(fireFlower.structure),
  creator: {
    signInName: fireFlower.creator.signInName,
  },
});

export const toFireFlowersDto = (fireFlowers: FireFlowerEntity[]): FireFlowerDto[] =>
  fireFlowers.map(toFireFlowerDto);
