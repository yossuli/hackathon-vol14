import type { DefineMethods } from 'aspida';
import type { RoomDto } from 'common/types/room';

export type Methods = DefineMethods<{
  put: {
    status: 204;
    reqBody: { name: string };
    resBody: RoomDto;
  };
  delete: {
    status: 204;
  };
}>;
