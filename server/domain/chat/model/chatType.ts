import type { DtoId } from 'common/types/brandedId';
import type { ChatDto } from 'common/types/chat';
import type { EntityId } from 'service/brandedId';

export type ChatEntity = Omit<ChatDto, 'id' | 'authorId' | 'roomId'> & {
  id: EntityId['chat'];
  author: { id: EntityId['user']; name: string };
  room: { id: EntityId['room']; name: string };
};

export type ChatCreateServerVal = {
  roomId: DtoId['room'];
  content: string;
};

export type ChatSaveVal = {
  savable: boolean;
  chat: ChatEntity;
};
