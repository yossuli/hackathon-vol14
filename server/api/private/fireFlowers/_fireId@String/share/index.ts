import type { DefineMethods } from 'aspida';
import type { DtoId } from 'common/types/brandedId';

export type Methods = DefineMethods<{
  post: {
    status: 200;
    reqBody: { id: DtoId['fireFlower']; userId: DtoId['user'] };
    resBody: { success: boolean };
  };
}>;
