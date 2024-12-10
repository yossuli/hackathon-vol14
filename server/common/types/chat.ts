import type { DtoId } from './brandedId';

export type ChatDto = {
  id: DtoId['chat'];
  authorId: DtoId['user'];
  roomId: DtoId['room'];
  content: string;
  createdAt: number;
};
