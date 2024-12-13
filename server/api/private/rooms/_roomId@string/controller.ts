import { fireFlowerQuery } from 'domain/fireFlower/repository/fireFlowerQuery';
import { toFireFlowersDto } from 'domain/fireFlower/service/toFireFlowerDto';
import { roomQuery } from 'domain/rooms/repository/roomQuery';
import { toRoomDto } from 'domain/rooms/service/toRoomDto';
import { roomUseCase } from 'domain/rooms/useCase/roomUseCase';
import { brandedId } from 'service/brandedId';
import { prismaClient } from 'service/prismaClient';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ params }) => {
    const roomPromise = roomQuery.findById(prismaClient, params.roomId).then(toRoomDto);
    const fireFlowersPromise = fireFlowerQuery
      .findByRoomId(prismaClient, brandedId.room.dto.parse(params.roomId))
      .then(toFireFlowersDto);

    const [room, fireFlowers] = await Promise.all([roomPromise, fireFlowersPromise]);

    const res = { ...room, fireFlowers };
    return {
      status: 200,
      body: res,
    };
  },
  post: async ({ user, params, body }) => ({
    status: 201,
    body: await roomUseCase.enterRoom(user, brandedId.room.dto.parse(params.roomId), body),
  }),
  put: async ({ user, body, params }) => ({
    status: 204,
    body: await roomUseCase.updateRoomName(user, body, params.roomId),
  }),
  delete: async ({ user, params }) => ({
    status: 204,
    body: await roomUseCase.delete(user, params.roomId),
  }),
}));
