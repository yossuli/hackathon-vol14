import type { RoomStatus } from '@prisma/client';
import type { RoomDto } from 'common/types/room';
import type { StrictOmit } from 'common/types/utils';
import type { EntityId } from 'service/brandedId';

export type RoomEntity = StrictOmit<RoomDto, 'id' | 'creator'> & {
  id: EntityId['room'];
  creator: StrictOmit<RoomDto['creator'], 'id'> & { id: EntityId['user'] };
} & RoomCreateServerVal;

export type RoomCreateServerVal = { name: string; password?: string; status: RoomStatus };

export type RoomSaveVal = { savable: boolean; room: RoomEntity };
