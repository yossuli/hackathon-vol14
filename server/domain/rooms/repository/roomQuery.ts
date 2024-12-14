import type { Prisma, Room, User, UserInRoom } from '@prisma/client';
import { brandedId } from 'service/brandedId';
import type { RoomEntity, UserInRoomFoundVal } from '../model/roomType';

const toEntity = (
  prismaRoom: Room & { Creator: User; UserInRooms?: (UserInRoom & { User: User })[] },
): RoomEntity => ({
  id: brandedId.room.entity.parse(prismaRoom.id),
  name: prismaRoom.name,
  password: prismaRoom.password ?? undefined,
  status: prismaRoom.status,
  creator: {
    id: brandedId.user.entity.parse(prismaRoom.creatorId),
    signInName: prismaRoom.Creator.signInName,
  },
  users: prismaRoom.UserInRooms?.map((userInRoom) => ({
    id: brandedId.user.entity.parse(userInRoom.userId),
    signInName: userInRoom.User.signInName,
  })),
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
    where: { status: 'PUBLIC' },
    orderBy: { createdAt: 'desc' },
    include: { Creator: true },
  });

  return prismaRooms.map(toEntity);
};

export const roomQuery = {
  listByCreatedAt,
  findById: async (tx: Prisma.TransactionClient, roomId: string): Promise<RoomEntity> =>
    tx.room
      .findUniqueOrThrow({
        where: { id: roomId },
        include: {
          Creator: true,
          UserInRooms: {
            include: {
              User: true,
            },
          },
        },
      })
      .then(toEntity),
  findByPassword: async (tx: Prisma.TransactionClient, password: string): Promise<RoomEntity> =>
    tx.room
      .findUniqueOrThrow({
        where: {
          password,
        },
        include: {
          Creator: true,
        },
      })
      .then(toEntity),
  hasUser: {
    findByUserId: async (
      tx: Prisma.TransactionClient,
      userId: string,
    ): Promise<UserInRoomFoundVal> => {
      const prismaRooms = await tx.room.findMany({
        where: {
          UserInRooms: {
            some: {
              userId,
            },
          },
        },
        take: 1,
      });
      return {
        found: prismaRooms.length > 0,
        roomId: prismaRooms[0]?.id ? brandedId.room.entity.parse(prismaRooms[0].id) : undefined,
      };
    },
  },
};
