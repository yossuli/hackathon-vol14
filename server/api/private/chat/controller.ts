import { chatQuery } from 'domain/chat/repository/chatQuery';
import { toChatsDto } from 'domain/chat/service/toChatDto';
import { prismaClient } from 'service/prismaClient';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ user }) => ({
    status: 200,
    body: await chatQuery.listByAuthor(prismaClient, user.id).then(toChatsDto),
  }),
}));
