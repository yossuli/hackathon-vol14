import { roomUseCase } from 'domain/rooms/useCase/roomUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await roomUseCase.enterPrivateRoom(body.id, body.password),
  }),
}));
