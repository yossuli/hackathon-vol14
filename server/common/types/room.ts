import type { RoomStatus } from '@prisma/client';
import type { DtoId } from './brandedId';

export type RoomDto = {
  id: DtoId['room'];
  name: string;
  password?: string;
  status: RoomStatus;
  createdAt: number;
  updatedAt: number;
  lastUsedAt: number;
  createdBy: { id: DtoId['user']; signInName: string };
};

export type RoomCreateVal = { name: string; password?: string; status: RoomStatus };

export type RoomUpdateVal = { name: string };

export type RoomFindVal = {
  id?: DtoId['room'];
  name?: string;
  status?: RoomStatus;
  createdBy?: DtoId['user'];
  createdAt?: number;
  updatedAt?: number;
  lastUsedAt?: number;
};

export type FriendRoomFindVal = { id: DtoId['room']; password: string };
export type RoomStatusEnum = RoomStatus;
