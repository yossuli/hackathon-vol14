import { fireFlowerUseCase } from 'domain/fireFlower/useCase/fireFlowerUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({
    status: 200,
    body: await fireFlowerUseCase.findAll(),
  }),
  post: async ({ user, body }) => ({
    status: 201,
    body: await fireFlowerUseCase.create(user, body),
  }),
  delete: async ({ user, body }) => ({
    status: 200,
    body: await fireFlowerUseCase.delete(user, body.id),
  }),
}));
