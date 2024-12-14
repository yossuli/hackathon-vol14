import type { RoomStatus } from '@prisma/client';
import type { RoomDto } from 'common/types/room';
import type { StrictOmit } from 'common/types/utils';
import type { FireFlowerEntity } from 'domain/fireFlower/model/fireFlowerType';
import type { EntityId } from 'service/brandedId';

export type RoomEntity = StrictOmit<RoomDto, 'id' | 'creator' | 'users'> & {
  id: EntityId['room'];
  creator: Omit<RoomDto['creator'], 'id'> & { id: EntityId['user'] };
  users?: { id: EntityId['user']; signInName: string }[];
} & RoomCreateServerVal;

export type RoomCreateServerVal = { name: string; password?: string; status: RoomStatus };

export type RoomFoundVal = { found: boolean; room: RoomEntity };

export type RoomSaveVal = { savable: boolean; room: RoomEntity };

export type UserInRoomEntity = {
  userId: EntityId['user'];
  roomId: EntityId['room'];
  enteredAt: number;
};

export type UserInRoomFoundVal = { found: boolean; roomId: EntityId['room'] | undefined };

export type RoomEnterSaveVal = RoomSaveVal & {
  userInRoom: UserInRoomEntity;
  fireFlowers: FireFlowerEntity[];
};

export type RoomExitSaveVal = {
  deletable: boolean;
  userInRoomId: EntityId['user'];
  roomId: EntityId['room'];
};
