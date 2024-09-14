import { RoomStatus } from '@prisma/client';
import type { DtoId } from 'common/types/brandedId';
import { defineController } from './$relay';

export default defineController(() => ({
  post: ({ user, body }) => ({
    status: 201,
    body: {
      id: body.id,
      name: 'test',
      password: body.password,
      status: RoomStatus['PRIVATE'],
      createdAt: 0,
      updatedAt: 0,
      lastUsedAt: 0,
      createdBy: { id: '1' as DtoId['user'], signInName: 'test' },
    },
  }),
  put: ({ user, body }) => ({
    status: 204,
    body: {
      id: '1' as DtoId['room'],
      name: body.name,
      password: 'test',
      status: RoomStatus['PRIVATE'],
      createdAt: 0,
      updatedAt: 0,
      lastUsedAt: 0,
      createdBy: { id: '1' as DtoId['user'], signInName: 'test' },
    },
  }),
}));
