import type { RoomDto, RoomFindVal, RoomUpdateVal } from 'common/types/room';
import type { UserDto } from 'common/types/user';
import { transaction } from 'service/prismaClient';
import { roomMethod } from '../model/roomMethod';
import type { RoomCreateServerVal } from '../model/roomType';
import { roomCommand } from '../repository/roomCommand';
import { toRoomDto, toRoomsDto } from '../service/toRoomDto';
import { roomQuery } from './../repository/roomQuery';

export const roomUseCase = {
  create: (user: UserDto, val: RoomCreateServerVal): Promise<RoomDto> =>
    transaction('RepeatableRead', async (tx) => {
      const created = roomMethod.create(user, val);

      await roomCommand.save(tx, created);

      return toRoomDto(created.room);
    }),
  updateRoomName: (user: UserDto, val: RoomUpdateVal, roomId: string): Promise<RoomDto> =>
    transaction('RepeatableRead', async (tx) => {
      const room = await roomQuery.findById(tx, roomId);
      const updated = await roomMethod.update(user, room, val);

      await roomCommand.save(tx, updated);

      return toRoomDto(updated.room);
    }),
  findAll: (): Promise<RoomDto[]> =>
    transaction('RepeatableRead', async (tx) => {
      const rooms = await roomQuery.listByCreatedAt(tx);
      const found = await roomMethod.findMany(rooms, {});

      return toRoomsDto(found.rooms);
    }),
  findByQuery: (query: RoomFindVal): Promise<RoomDto[]> =>
    transaction('RepeatableRead', async (tx) => {
      const rooms = await roomQuery.findByQuery(tx, query);
      const found = await roomMethod.findMany(rooms, {});

      return toRoomsDto(found.rooms);
    }),
  findByIdWithPassword: (roomId: string, password: string): Promise<RoomDto> =>
    transaction('RepeatableRead', async (tx) => {
      const room = await roomQuery.findById(tx, roomId).then((room) => {
        return room;
      });
      const found = await roomMethod.find(room, { password });

      return toRoomDto(found.room);
    }),
  delete: (user: UserDto, roomId: string): Promise<RoomDto> =>
    transaction('RepeatableRead', async (tx) => {
      const room = await roomQuery.findById(tx, roomId).then((room) => {
        return room;
      });
      const deleted = roomMethod.delete(user, room);

      await roomCommand.delete(tx, deleted);

      return toRoomDto(deleted.room);
    }),
};
