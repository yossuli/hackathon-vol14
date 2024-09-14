import type { RoomDto, RoomUpdateVal } from 'common/types/room';
import type { UserDto } from 'common/types/user';
import { transaction } from 'service/prismaClient';
import { roomMethod } from '../model/roomMethod';
import type { RoomCreateServerVal } from '../model/roomType';
import { roomCommand } from '../repository/roomCommand';
import { roomQuery } from '../repository/roomQuery';
import { toRoomDto } from '../service/toRoomDto';

export const roomUseCase = {
  create: (user: UserDto, val: RoomCreateServerVal): Promise<RoomDto> =>
    transaction('RepeatableRead', async (tx) => {
      const created = roomMethod.create(user, val);

      await roomCommand.save(tx, created);

      return toRoomDto(created.room);
    }),
  updateRoomName: (user: UserDto, val: RoomUpdateVal): Promise<RoomDto> =>
    transaction('RepeatableRead', async (tx) => {
      const room = await roomQuery.findById(tx, val.roomId);
      const updated = await roomMethod.update(user, room, val);

      await roomCommand.save(tx, updated);

      return toRoomDto(updated.room);
    }),
  enterFriendRoom: (password: string): Promise<RoomDto> =>
    transaction('RepeatableRead', async (tx) => {
      const room = await roomQuery.findByRoomNameAndPassword(tx, { password });
      const entered = await roomMethod.find(room, { password });

      await roomCommand.save(tx, entered);

      return toRoomDto(entered.room);
    }),
  enterRoom: (roomId: string): Promise<RoomDto> =>
    transaction('RepeatableRead', async (tx) => {
      const room = await roomQuery.findById(tx, roomId);
      const entered = await roomMethod.find(room, {});

      await roomCommand.save(tx, entered);

      return toRoomDto(entered.room);
    }),
  delete: (user: UserDto, roomId: string): Promise<RoomDto> =>
    transaction('RepeatableRead', async (tx) => {
      const room = await roomQuery.findById(tx, roomId).then((room) => {
        if (!room) {
          throw new Error('Room not found');
        }
        return room;
      });
      const deleted = roomMethod.delete(user, room);

      await roomCommand.delete(tx, deleted);

      return toRoomDto(deleted.room);
    }),
};
