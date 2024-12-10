import type { ChatDto } from 'common/types/chat';
import { brandedId } from 'service/brandedId';
import type { ChatEntity } from '../model/chatType';

export const toChatDto = (chat: ChatEntity): ChatDto => ({
  id: brandedId.chat.dto.parse(chat.id),
  authorId: brandedId.user.dto.parse(chat.authorId),
  roomId: brandedId.room.dto.parse(chat.roomId),
  content: chat.content,
  createdAt: chat.createdAt,
});

export const toChatsDto = (chats: ChatEntity[]): ChatDto[] => chats.map(toChatDto);
