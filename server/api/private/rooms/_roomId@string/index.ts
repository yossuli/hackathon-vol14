import type { DefineMethods } from 'aspida';
import type { RoomDto, RoomUpdateVal } from 'common/types/room';

export type Methods = DefineMethods<{
  get: {
    status: 200;
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
