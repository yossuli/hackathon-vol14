import { roomUseCase } from 'domain/rooms/useCase/roomUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({
    status: 200,
    body: await roomUseCase.findAll(),
  }),
  post: async ({ user, body }) => ({
    status: 201,
    body: await roomUseCase.create(user, body),
  }),
}));
