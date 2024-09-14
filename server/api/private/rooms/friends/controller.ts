import { roomUseCase } from 'domain/rooms/useCase/roomUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await roomUseCase.findByIdWithPassword(body.id, body.password),
  }),
  put: async ({ user, body }) => ({
    status: 204,
    body: await roomUseCase.create(user, body),
  }),
}));
