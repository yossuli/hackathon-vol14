import type { DefineMethods } from 'aspida';
import type { FriendRoomFindVal, RoomDto } from 'common/types/room';

export type Methods = DefineMethods<{
  post: {
    status: 201;
    reqBody: FriendRoomFindVal;
    resBody: RoomDto;
  };
}>;
