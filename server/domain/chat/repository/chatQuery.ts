import type { Chat, Prisma, Room, User } from '@prisma/client';
import type { DtoId } from 'common/types/brandedId';
import { brandedId } from 'service/brandedId';
import type { ChatEntity } from '../model/chatType';

const toEntity = (
  prismaChat: Chat & {
    room: Room;
    author: User;
  },
): ChatEntity => ({
  id: brandedId.chat.entity.parse(prismaChat.id),
  content: prismaChat.content,
  createdAt: prismaChat.createdAt.getTime(),
  room: {
    id: brandedId.room.entity.parse(prismaChat.room.id),
    name: prismaChat.room.name,
  },
  author: {
    id: brandedId.user.entity.parse(prismaChat.author.id),
    name: prismaChat.author.signInName,
  },
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
