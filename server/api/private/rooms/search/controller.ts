import { RoomStatus } from '@prisma/client';
import type { DtoId } from 'common/types/brandedId';
import { defineController } from './$relay';

export default defineController(() => ({
  // eslint-disable-next-line complexity
  get: ({ query }) => ({
    status: 200,
    body: [
      {
        id: query.id ?? ('1' as DtoId['room']),
        name: query.name ?? 'test',
        status: query.status ?? RoomStatus['PUBLIC'],
        createdAt: query.createdAt ?? 0,
        updatedAt: query.updatedAt ?? 0,
        lastUsedAt: query.lastUsedAt ?? 0,
        createdBy: { id: '1' as DtoId['user'], signInName: 'test' },
      },
    ],
  }),
}));
