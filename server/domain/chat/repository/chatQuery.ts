import type { Chat, Prisma } from '@prisma/client';
import type { DtoId } from 'common/types/brandedId';
import { brandedId } from 'service/brandedId';
import type { ChatEntity } from '../model/chatType';

const toEntity = (prismaChat: Chat): ChatEntity => ({
  id: brandedId.chat.entity.parse(prismaChat.id),
  authorId: brandedId.user.entity.parse(prismaChat.authorId),
  roomId: brandedId.room.entity.parse(prismaChat.roomId),
  content: prismaChat.content,
  createdAt: prismaChat.createdAt.getTime(),
});

const listByAuthor = async (
  tx: Prisma.TransactionClient,
  authorId: DtoId['user'],
): Promise<ChatEntity[]> => {
  const prismaChats = await tx.chat.findMany({
    where: { authorId },
    include: {
      room: true,
      author: true,
    },
  });
  return prismaChats.map(toEntity);
};

export const chatQuery = {
  listByAuthor,
};
