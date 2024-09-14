import { RoomStatus } from '@prisma/client';
import type { DtoId } from 'common/types/brandedId';
import { defineController } from './$relay';

export default defineController(() => ({
  put: ({ user, body, params }) => ({
    status: 204,
    body: {
      id: params.roomId as DtoId['room'],
      name: body.name,
      status: RoomStatus['PUBLIC'],
      createdAt: 0,
      updatedAt: 0,
      lastUsedAt: 0,
      createdBy: { id: user.id, signInName: user.signInName },
    },
  }),
  delete: () => ({
    status: 204,
  }),
}));