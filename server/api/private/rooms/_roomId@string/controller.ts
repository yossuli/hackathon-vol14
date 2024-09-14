import { roomUseCase } from 'domain/rooms/useCase/roomUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  put: async ({ user, body }) => ({
    status: 204,
    body: await roomUseCase.updateRoomName(user, body),
  }),
  delete: async ({ user, params }) => ({
    status: 204,
    body: await roomUseCase.delete(user, params.roomId),
  }),
}));
