import { fireFlowerQuery } from 'domain/fireFlower/repository/fireFlowerQuery';
import { toFireFlowersDto } from 'domain/fireFlower/service/toFireFlowerDto';
import { fireFlowerUseCase } from 'domain/fireFlower/useCase/fireFlowerUseCase';
import { prismaClient } from 'service/prismaClient';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: await fireFlowerQuery.listByCreatedAt(prismaClient, query?.limit).then(toFireFlowersDto),
  }),
  post: async ({ user, body }) => ({
    status: 201,
    body: await fireFlowerUseCase.create(user, body),
  }),
  delete: async ({ user, body }) => ({
    status: 200,
    body: await fireFlowerUseCase.delete(user, body.id),
  }),
}));
