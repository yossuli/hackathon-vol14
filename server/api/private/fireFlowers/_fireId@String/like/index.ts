import type { DefineMethods } from 'aspida';
import type { DtoId } from 'common/types/brandedId';

export type Methods = DefineMethods<{
  post: {
    status: 200;
    reqBody: { id: DtoId['fireFlower'] };
    resBody: { success: boolean };
  };
  delete: {
    status: 200;
    reqBody: { id: DtoId['fireFlower'] };
    resBody: { success: boolean };
  };
}>;
