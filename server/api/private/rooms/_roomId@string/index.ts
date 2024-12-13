import type { DefineMethods } from 'aspida';
import type { DtoId } from 'common/types/brandedId';
import type { FireFlowerDto } from 'common/types/fireFlower';
import type { RoomDto, RoomUpdateVal } from 'common/types/room';

export type Methods = DefineMethods<{
  get: {
    status: 200;
    resBody: RoomDto & { fireFlowers: FireFlowerDto[] };
  };
  post: {
    status: 201;
    reqBody: DtoId['fireFlower'][];
    resBody: RoomDto;
  };
  put: {
    status: 204;
    reqBody: RoomUpdateVal;
    resBody: RoomDto;
  };
  delete: {
    status: 204;
  };
}>;
