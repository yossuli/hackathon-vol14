import { fireFlowerNameValidator, fireFlowerValidator } from 'common/validators/fireFlower';
import { fireFlowerQuery } from 'domain/fireFlower/repository/fireFlowerQuery';
import { toFireFlowerDto } from 'domain/fireFlower/service/toFireFlowerDto';
import { fireFlowerUseCase } from 'domain/fireFlower/useCase/fireFlowerUseCase';
import { brandedId } from 'service/brandedId';
import { prismaClient } from 'service/prismaClient';
import { z } from 'zod';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ params }) => ({
    status: 200,
    body: await fireFlowerQuery.findById(prismaClient, params.fireId).then(toFireFlowerDto),
  }),
  patch: {
    validators: {
      body: z.object({
        name: fireFlowerNameValidator.optional(),
        structure: fireFlowerValidator.optional(),
      }),
    },
    handler: async ({ user, body, params }) => ({
      status: 201,
      body: await fireFlowerUseCase.update(user, {
        ...body,
        fireFlowerId: brandedId.fireFlower.maybe.parse(params.fireId),
      }),
    }),
  },
}));
