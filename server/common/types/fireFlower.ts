import type { z } from 'zod';
import type { fireFlowerValidator } from '../validators/fireFlower';
import type { DtoId } from './brandedId';

export type FireFlower = z.infer<typeof fireFlowerValidator>;

export type FireFlowerDto = {
  id: DtoId['fireFlower'];
  name: string;
  createdAt: number;
  updatedAt?: number;
  structure: FireFlower;
  creator: { id: DtoId['user']; signInName: string };
};

export type FireFlowerCreateVal = {
  name: string;
};

export type FireFlowerUpdateVal = {
  name?: string;
  structure?: FireFlower;
};

export type FireFlowerFindVal = {
  id?: DtoId['fireFlower'];
  name?: string;
  createdAt?: number;
  updatedAt?: number;
  creatorId?: DtoId['user'];
};
