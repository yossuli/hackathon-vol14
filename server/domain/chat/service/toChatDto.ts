import type { ChatDto } from 'common/types/chat';
import { brandedId } from 'service/brandedId';
import type { ChatEntity } from '../model/chatType';

export const toChatDto = (chat: ChatEntity): ChatDto => ({
  id: brandedId.chat.dto.parse(chat.id),
  content: chat.content,
  createdAt: chat.createdAt,
  room: { name: chat.room.name },
  author: { name: chat.author.name },
});

export const toChatsDto = (chats: ChatEntity[]): ChatDto[] => chats.map(toChatDto);
