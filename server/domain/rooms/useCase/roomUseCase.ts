import type { DtoId } from 'common/types/brandedId';
import type { RoomDto, RoomUpdateVal } from 'common/types/room';
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
      const updated = roomMethod.update(user, room, val);

      await roomCommand.save(tx, updated);

      return toRoomDto(updated.room);
    }),
  findAll: (): Promise<RoomDto[]> =>
    transaction('RepeatableRead', async (tx) => {
      const rooms = await roomQuery.listByCreatedAt(tx);
      const found = roomMethod.findMany(rooms);

      return toRoomsDto(found);
    }),
  findByIdWithPassword: (roomId: string, password: string): Promise<RoomDto> =>
    transaction('RepeatableRead', async (tx) => {
      const room = await roomQuery.findById(tx, roomId);
      const found = roomMethod.find(room, password);

      return toRoomDto(found.room);
    }),
  enterRoom: (user: UserDto, roomId: DtoId['room']): Promise<RoomDto> =>
    transaction('RepeatableRead', async (tx) => {
      const userInRoom = await roomQuery.hasUser.findByUserId(tx, user.id);
      const room = await roomQuery.findById(tx, roomId);
      const found = roomMethod.find(room);
      const entered = roomMethod.entered(user, found, userInRoom.found);

      await roomCommand.giveUser.create(tx, entered);
      await roomCommand.save(tx, entered);

      return toRoomDto(entered.room);
    }),
  exitRoom: (user: UserDto): Promise<RoomDto> =>
    transaction('RepeatableRead', async (tx) => {
      const userInRoom = await roomQuery.hasUser.findByUserId(tx, user.id);
      const exit = roomMethod.exit(user, userInRoom);
      const room = await roomQuery.findById(tx, exit.roomId);

      await roomCommand.giveUser.delete(tx, exit);

      return toRoomDto(room);
    }),
  delete: (user: UserDto, roomId: string): Promise<RoomDto> =>
    transaction('RepeatableRead', async (tx) => {
      const room = await roomQuery.findById(tx, roomId);
      const deleted = roomMethod.delete(user, room);

      await roomCommand.delete(tx, deleted);

      return toRoomDto(deleted.room);
    }),
};
