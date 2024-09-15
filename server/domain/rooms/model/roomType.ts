import type { RoomStatus } from '@prisma/client';
import type { RoomDto } from 'common/types/room';
import type { EntityId } from 'service/brandedId';

export type RoomEntity = Omit<RoomDto, 'id' | 'creator'> & {
  id: EntityId['room'];
  creator: Omit<RoomDto['creator'], 'id'> & { id: EntityId['user'] };
} & RoomCreateServerVal;

export type RoomCreateServerVal = { name: string; password?: string; status: RoomStatus };

export type RoomSaveVal = { room: RoomEntity };
