import type { DefineMethods } from 'aspida';
import type { DtoId } from 'common/types/brandedId';
import type { FireFlowerCreateVal, FireFlowerDto } from 'common/types/fireFlower';
// import type { FireFlowerSaveVal } from 'domain/fireFlower/model/fireFlowerType';

export type Methods = DefineMethods<{
  get: {
    status: 200;
    resBody: FireFlowerDto[];
  };
  post: {
    status: 201;
    reqBody: FireFlowerCreateVal;
    resBody: FireFlowerDto;
  };
  // put: {
  //   status: 200;
  //   reqBody: FireFlowerSaveVal;
  //   resBody: FireFlowerDto;
  // };
  delete: {
    status: 200;
    reqBody: { id: DtoId['fireFlower'] };
  };
}>;
