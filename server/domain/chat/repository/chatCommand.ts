import type { Prisma } from '@prisma/client';
import type { ChatSaveVal } from '../model/chatType';

export const chatCommand = {
  save: async (tx: Prisma.TransactionClient, val: ChatSaveVal): Promise<void> => {
    await tx.chat.create({
      data: {
        id: val.chat.id,
        authorId: val.chat.authorId,
        roomId: val.chat.roomId,
        content: val.chat.content,
        createdAt: new Date(val.chat.createdAt),
      },
    });
  },
};
