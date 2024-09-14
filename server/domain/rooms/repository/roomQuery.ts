import type { Prisma, Room, User } from '@prisma/client';
import type { RoomFindVal } from 'common/types/room';
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

  // eslint-disable-next-line complexity
  findByQuery: async (tx: Prisma.TransactionClient, query: RoomFindVal): Promise<RoomEntity[]> => {
    const prismaRooms = await tx.room.findMany({
      where: {
        id: query.id ? brandedId.room.entity.parse(query.id) : undefined,
        name: query.name,
        status: query.status,
        creatorId: query.createdBy ? brandedId.user.entity.parse(query.createdBy) : undefined,
        createdAt: query.createdAt ? new Date(query.createdAt) : undefined,
        updatedAt: query.updatedAt ? new Date(query.updatedAt) : undefined,
        lastUsedAt: query.lastUsedAt ? new Date(query.lastUsedAt) : undefined,
      },
      include: { Creator: true },
    });

    return prismaRooms.map(toEntity);
  },
};
