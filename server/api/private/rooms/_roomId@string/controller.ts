import { roomUseCase } from 'domain/rooms/useCase/roomUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  put: async ({ user, body, params }) => ({
    status: 204,
    body: await roomUseCase.updateRoomName(user, body, params.roomId),
  }),
  delete: async ({ user, params }) => ({
    status: 204,
    body: await roomUseCase.delete(user, params.roomId),
  }),
}));
