import type { DefineMethods } from 'aspida';
import type { FriendRoomFindVal, RoomCreateVal, RoomDto } from 'common/types/room';

export type Methods = DefineMethods<{
  post: {
    status: 201;
    reqBody: FriendRoomFindVal;
    resBody: RoomDto;
  };
  put: {
    status: 204;
    reqBody: Required<RoomCreateVal>;
    resBody: RoomDto;
  };
}>;
