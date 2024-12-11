import type { RoomDto } from 'common/types/room';
import { brandedId } from 'service/brandedId';
import type { RoomEntity } from '../model/roomType';

export const toRoomDto = (room: RoomEntity): RoomDto => ({
  id: brandedId.room.dto.parse(room.id),
  name: room.name,
  status: room.status,
  createdAt: room.createdAt,
  updatedAt: room.updatedAt,
  lastUsedAt: room.lastUsedAt,
  creator: { id: brandedId.user.dto.parse(room.creator.id), signInName: room.creator.signInName },
  users: room.users?.map((user) => ({
    id: brandedId.user.dto.parse(user.id),
    signInName: user.signInName,
  })),
});

export const toRoomsDto = (rooms: RoomEntity[]): RoomDto[] => rooms.map(toRoomDto);
