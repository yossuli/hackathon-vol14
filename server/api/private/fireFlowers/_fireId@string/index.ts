import type { DefineMethods } from 'aspida';
import type { FireFlowerDto, FireFlowerUpdateVal } from 'common/types/fireFlower';

export type Methods = DefineMethods<{
  get: {
    status: 200;
    resBody: FireFlowerDto;
  };
  post: {
    status: 201;
    reqBody: FireFlowerUpdateVal;

    resBody: FireFlowerDto;
  };
}>;
