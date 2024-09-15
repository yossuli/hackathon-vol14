import type { DefineMethods } from 'aspida';
import type { DtoId } from 'common/types/brandedId';
import type { FireFlowerDto, FireFlowerUpdateVal } from 'common/types/fireFlower';

export type Methods = DefineMethods<{
  get: {
    status: 200;
    resBody: FireFlowerDto;
  };
  post: {
    status: 201;
    reqBody: {
      id: DtoId['fireFlower'];
      update: FireFlowerUpdateVal;
    };
    resBody: FireFlowerDto;
  };
}>;
