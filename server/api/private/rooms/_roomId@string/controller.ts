import { roomQuery } from 'domain/rooms/repository/roomQuery';
import { toRoomDto } from 'domain/rooms/service/toRoomDto';
import { roomUseCase } from 'domain/rooms/useCase/roomUseCase';
import { brandedId } from 'service/brandedId';
import { prismaClient } from 'service/prismaClient';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ params }) => ({
    status: 200,
    body: await roomQuery.findById(prismaClient, params.roomId).then(toRoomDto),
  }),
  post: async ({ user, params }) => ({
    status: 201,
    body: await roomUseCase.enterRoom(user, brandedId.room.dto.parse(params.roomId)),
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
