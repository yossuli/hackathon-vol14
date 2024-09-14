import { RoomStatus } from '@prisma/client';
import type { DtoId } from 'common/types/brandedId';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({
    status: 200,
    body: [
      {
        id: '1' as DtoId['room'],
        name: 'test',
        status: RoomStatus['PUBLIC'],
        createdAt: 0,
        updatedAt: 0,
        lastUsedAt: 0,
        createdBy: { id: '1' as DtoId['user'], signInName: 'test' },
      },
    ],
  }),
  post: ({ user, body }) => ({
    status: 201,
    body: {
      id: '1' as DtoId['room'],
      name: body.name,
      password: body.password,
      status: body.status,
      createdAt: 0,
      updatedAt: 0,
      lastUsedAt: 0,
      createdBy: { id: user.id, signInName: user.signInName },
    },
  }),
}));
