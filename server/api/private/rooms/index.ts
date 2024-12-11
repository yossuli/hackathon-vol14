import type { DefineMethods } from 'aspida';
import type { RoomCreateVal, RoomDto } from './../../../common/types/room';

export type Methods = DefineMethods<{
  get: {
    status: 200;
    resBody: RoomDto[];
  };
  post: {
    status: 201;
    reqBody: RoomCreateVal;
    resBody: RoomDto;
  };
  delete: {
    status: 204;
  };
}>;
