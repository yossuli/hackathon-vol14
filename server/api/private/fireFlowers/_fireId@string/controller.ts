import type { DtoId } from 'common/types/brandedId';
import { defineController } from './$relay';

export default defineController(() => ({
  get: ({ params }) => ({
    status: 200,
    body: {
      id: params.fireId as DtoId['fireFlower'],
      name: 'Fire Flower',
      createdAt: 0,
      updatedAt: undefined,
      structure: [['#f00']],
      creator: { id: '1' as DtoId['user'], signInName: 'teat' },
    },
  }),
  post: ({ user, params }) => ({
    status: 201,
    body: {
      id: params.fireId as DtoId['fireFlower'],
      name: 'Fire Flower',
      createdAt: 0,
      updatedAt: undefined,
      structure: [['#f00']],
      creator: { id: user.id, signInName: user.signInName },
    },
  }),
}));
