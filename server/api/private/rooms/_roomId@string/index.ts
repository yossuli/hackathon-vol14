import type { DefineMethods } from 'aspida';
import type { RoomDto, RoomUpdateVal } from 'common/types/room';

export type Methods = DefineMethods<{
  put: {
    status: 204;
    reqBody: RoomUpdateVal;
    resBody: RoomDto;
  };
  delete: {
    status: 204;
  };
}>;
