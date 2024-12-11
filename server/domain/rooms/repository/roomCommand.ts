import type { Prisma } from '@prisma/client';
import assert from 'assert';
import type { RoomEnterSaveVal, RoomExitSaveVal, RoomSaveVal } from '../model/roomType';

export const roomCommand = {
  save: async (tx: Prisma.TransactionClient, val: RoomSaveVal): Promise<void> => {
    assert(val.savable);

    await tx.room.upsert({
      where: { id: val.room.id },
      update: {
        name: val.room.name,
        updatedAt: val.room.updatedAt ? new Date(val.room.updatedAt) : undefined,
        lastUsedAt: val.room.lastUsedAt ? new Date(val.room.lastUsedAt) : undefined,
      },
      create: {
        id: val.room.id,
        name: val.room.name,
        password: val.room.password,
        status: val.room.status,
        createdAt: new Date(val.room.createdAt),
        updatedAt: undefined,
        creatorId: val.room.creator.id,
      },
    });
  },
  delete: async (
    tx: Prisma.TransactionClient,
    val: { deletable: boolean; room: RoomSaveVal['room'] },
  ): Promise<void> => {
    assert(val.deletable);

    await tx.room.delete({ where: { id: val.room.id } });
  },
  giveUser: {
    create: async (tx: Prisma.TransactionClient, val: RoomEnterSaveVal): Promise<void> => {
      assert(val.savable);
      await tx.userInRoom.create({
        data: {
          userId: val.userInRoom.userId,
          roomId: val.userInRoom.roomId,
          enteredAt: new Date(val.userInRoom.enteredAt),
        },
      });
    },
    delete: async (tx: Prisma.TransactionClient, val: RoomExitSaveVal): Promise<void> => {
      assert(val.deletable);
      await tx.userInRoom.delete({ where: { userId: val.userInRoomId } });
    },
  },
};
