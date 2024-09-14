import type { Prisma, Room, User } from '@prisma/client';
import { brandedId } from 'service/brandedId';
import type { RoomEntity } from '../model/roomType';

const toEntity = (prismaRoom: Room & { Creator: User }): RoomEntity => ({
  id: brandedId.room.entity.parse(prismaRoom.id),
  name: prismaRoom.name,
  password: prismaRoom.password ?? undefined,
  status: prismaRoom.status,
  creator: {
    id: brandedId.user.entity.parse(prismaRoom.creatorId),
    signInName: prismaRoom.Creator.signInName,
  },
  createdAt: prismaRoom.createdAt.getTime(),
  updatedAt: prismaRoom.updatedAt?.getTime() ?? undefined,
  lastUsedAt: prismaRoom.lastUsedAt?.getTime() ?? undefined,
});
const listByCreatedAt = async (
  tx: Prisma.TransactionClient,
  limit?: number,
): Promise<RoomEntity[]> => {
  const prismaRooms = await tx.room.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: { Creator: true },
  });

  return prismaRooms.map(toEntity);
};

export const roomQuery = {
  listByCreatedAt,
  findByRoomNameAndPassword: async (
    tx: Prisma.TransactionClient,
    val: { password: string },
  ): Promise<RoomEntity> =>
    tx.room
      .findUniqueOrThrow({
        where: {
          password: val.password,
        },
        include: { Creator: true },
      })
      .then(toEntity),
  findById: async (tx: Prisma.TransactionClient, roomId: string): Promise<RoomEntity> =>
    tx.room.findUniqueOrThrow({ where: { id: roomId }, include: { Creator: true } }).then(toEntity),
};
