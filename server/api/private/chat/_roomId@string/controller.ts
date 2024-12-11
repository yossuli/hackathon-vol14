import { chatUseCase } from 'domain/chat/useCase/chatUseCase';
import { brandedId } from 'service/brandedId';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ params, user, body }) => ({
    status: 201,
    body: await chatUseCase.create(user, {
      roomId: brandedId.room.dto.parse(params.roomId),
      content: body.content,
    }),
  }),
}));
