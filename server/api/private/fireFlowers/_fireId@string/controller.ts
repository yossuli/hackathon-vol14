import { fireFlowerUseCase } from 'domain/fireFlower/useCase/fireFlowerUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ params }) => ({
    status: 200,
    body: await fireFlowerUseCase.findById(params.fireId),
  }),
  post: async ({ user, body, params }) => ({
    status: 201,
    body: await fireFlowerUseCase.update(user, body, params.fireId),
  }),
}));
