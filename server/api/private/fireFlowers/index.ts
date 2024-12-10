import type { DefineMethods } from 'aspida';
import type { DtoId } from 'common/types/brandedId';
import type { FireFlowerCreateVal, FireFlowerDto } from 'common/types/fireFlower';

export type Methods = DefineMethods<{
  get: {
    status: 200;
    query?: { limit: number };
    resBody: FireFlowerDto[];
  };
  post: {
    status: 201;
    reqBody: FireFlowerCreateVal;
    resBody: FireFlowerDto;
  };
  delete: {
    status: 200;
    reqBody: { id: DtoId['fireFlower'] };
  };
}>;
