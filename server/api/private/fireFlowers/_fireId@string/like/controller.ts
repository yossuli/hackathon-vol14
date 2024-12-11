import { fireFlowerUseCase } from 'domain/fireFlower/useCase/fireFlowerUseCase';
import { brandedId } from 'service/brandedId';
import { defineController } from './$relay';

export default defineController(() => ({
  patch: async ({ user, params }) => {
    return {
      status: 201,
      body: await fireFlowerUseCase.like.update(
        user,
        brandedId.fireFlower.dto.parse(params.fireId),
      ),
    };
  },
}));
