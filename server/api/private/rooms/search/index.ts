import type { DefineMethods } from 'aspida';
import type { RoomDto, RoomFindVal } from 'common/types/room';

export type Methods = DefineMethods<{
  get: {
    status: 200;
    query: RoomFindVal;
    resBody: RoomDto[];
  };
}>;
