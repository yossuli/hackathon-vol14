import type {
  FireFlowerCreateVal
  FireFlowerDto,
  FireFlowerFindVal,
  FireFlowerUpdateVal,
} from 'common/types/fireFlower';
import type { UserDto } from 'common/types/user';
import { transaction } from 'service/prismaClient';
import { fireFlowerMethod } from '../model/fireFlowerMethod';
import { fireFlowerCommand } from '../repository/fireFlowerCommand';
import { fireFlowerQuery } from '../repository/fireFlowerQuery';
import { toFireFlowerDto, toFireFlowersDto } from '../service/toFireFlowerDto';

export const fireFlowerUseCase = {
  create: (user: UserDto, val: FireFlowerCreateVal): Promise<FireFlowerDto> =>
    transaction('RepeatableRead', async (tx) => {
      const created = fireFlowerMethod.create(user, val);

      await fireFlowerCommand.save(tx, created);

      return toFireFlowerDto(created.fireFlower);
    }),
  update: (user: UserDto, val: FireFlowerUpdateVal, fireFlowerId: string): Promise<FireFlowerDto> =>
    transaction('RepeatableRead', async (tx) => {
      const fireFlower = await fireFlowerQuery.findById(tx, fireFlowerId);
      const updated = fireFlowerMethod.update(user, fireFlower, val);

      await fireFlowerCommand.save(tx, updated);

      return toFireFlowerDto(updated.fireFlower);
    }),
  findAll: (): Promise<FireFlowerDto[]> =>
    transaction('RepeatableRead', async (tx) => {
      const fireFlowers = await fireFlowerQuery.listByCreatedAt(tx);
      const found = await fireFlowerMethod.findMany(fireFlowers);

      return toFireFlowersDto(found.fireFlowers);
    }),
  findByQuery: (query: FireFlowerFindVal): Promise<FireFlowerDto[]> =>
    transaction('RepeatableRead', async (tx) => {
      const fireFlowers = await fireFlowerQuery.findByQuery(tx, query);
      const found = await fireFlowerMethod.findMany(fireFlowers);

      return toFireFlowersDto(found.fireFlowers);
    }),
  findById: (fireFlowerId: string): Promise<FireFlowerDto> =>
    transaction('RepeatableRead', async (tx) => {
      const fireFlower = await fireFlowerQuery.findById(tx, fireFlowerId);

      return toFireFlowerDto(fireFlower);
    }),
  delete: (user: UserDto, fireFlowerId: string): Promise<FireFlowerDto> =>
    transaction('RepeatableRead', async (tx) => {
      const fireFlower = await fireFlowerQuery.findById(tx, fireFlowerId);
      const deleted = fireFlowerMethod.delete(user, fireFlower);

      await fireFlowerCommand.delete(tx, deleted);

      return toFireFlowerDto(deleted.fireFlower);
    }),
};
