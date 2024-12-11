import type { UserDto } from 'common/types/user';
import type { RoomEntity } from 'domain/rooms/model/roomType';
import { brandedId } from 'service/brandedId';
import { ulid } from 'ulid';
import type { ChatCreateServerVal, ChatSaveVal } from './chatType';

export const chatMethod = {
  create: (user: UserDto, room: RoomEntity, val: ChatCreateServerVal): ChatSaveVal => {
    const chat = {
      id: brandedId.chat.entity.parse(ulid()),
      content: val.content,
      createdAt: Date.now(),
      room: {
        id: brandedId.room.entity.parse(room.id),
        name: room.name,
      },
      author: {
        id: brandedId.user.entity.parse(user.id),
        name: user.signInName,
      },
    };

    return {
      savable: true,
      chat,
    };
  },
};
