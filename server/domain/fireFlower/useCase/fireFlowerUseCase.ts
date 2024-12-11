import type { DtoId } from 'common/types/brandedId';
import type { FireFlowerCreateVal, FireFlowerDto } from 'common/types/fireFlower';
import type { UserDto } from 'common/types/user';
import { transaction } from 'service/prismaClient';
import { fireFlowerMethod } from '../model/fireFlowerMethod';
import type { FireFlowerUpdateServerVal } from '../model/fireFlowerType';
import { fireFlowerCommand } from '../repository/fireFlowerCommand';
import { fireFlowerQuery } from '../repository/fireFlowerQuery';
import { toFireFlowerDto } from '../service/toFireFlowerDto';

export const fireFlowerUseCase = {
  create: (user: UserDto, val: FireFlowerCreateVal): Promise<FireFlowerDto> =>
    transaction('RepeatableRead', async (tx) => {
      const created = fireFlowerMethod.create(user, val);

      await fireFlowerCommand.save(tx, created);

      return toFireFlowerDto(created.fireFlower);
    }),
  update: (user: UserDto, val: FireFlowerUpdateServerVal): Promise<FireFlowerDto> =>
    transaction('RepeatableRead', async (tx) => {
      const fireFlower = await fireFlowerQuery.findById(tx, val.fireFlowerId);
      const updated = fireFlowerMethod.update(user, fireFlower, val);

      await fireFlowerCommand.save(tx, updated);

      return toFireFlowerDto(updated.fireFlower);
    }),
  delete: (user: UserDto, fireFlowerId: string): Promise<FireFlowerDto> =>
    transaction('RepeatableRead', async (tx) => {
      const fireFlower = await fireFlowerQuery.findById(tx, fireFlowerId);
      const deleted = fireFlowerMethod.delete(user, fireFlower);

      await fireFlowerCommand.delete(tx, deleted);

      return toFireFlowerDto(deleted.fireFlower);
    }),
  like: {
    update: (user: UserDto, fireFlowerId: DtoId['fireFlower']): Promise<{ success: boolean }> =>
      transaction('RepeatableRead', async (tx) => {
        const likedFireFlower = await fireFlowerQuery.like.findByFireFlowerId(
          tx,
          fireFlowerId,
          user.id,
        );
        if (likedFireFlower) {
          const deleted = fireFlowerMethod.like.delete(user, likedFireFlower);
          await fireFlowerCommand.like.delete(tx, deleted);
          return { success: true };
        }
        await fireFlowerCommand.like.create(tx, fireFlowerMethod.like.create(user, fireFlowerId));
        return { success: true };
      }),
  },
};
