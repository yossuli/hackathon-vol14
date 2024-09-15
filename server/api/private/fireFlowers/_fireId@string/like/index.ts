import type { DefineMethods } from 'aspida';
import type { DtoId } from 'common/types/brandedId';

export type Methods = DefineMethods<{
  post: {
    status: 201;
    reqBody: { id: DtoId['fireFlower'] };
    resBody: { success: boolean };
  };
  delete: {
    status: 201;
    reqBody: { id: DtoId['fireFlower'] };
    resBody: { success: boolean };
  };
}>;
