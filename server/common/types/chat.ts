import type { DtoId } from './brandedId';

export type ChatDto = {
  id: DtoId['chat'];
  content: string;
  createdAt: number;
  room: { name: string };
  author: { name: string };
};
