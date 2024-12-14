import { roomUseCase } from 'domain/rooms/useCase/roomUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ user, body }) => ({
    status: 201,
    body: await roomUseCase.enterPrivateRoom(user, body.password, body.fireFlowerIds),
  }),
}));
