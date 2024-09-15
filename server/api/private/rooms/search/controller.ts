import { roomUseCase } from 'domain/rooms/useCase/roomUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: await roomUseCase.findByQuery(query),
  }),
}));
