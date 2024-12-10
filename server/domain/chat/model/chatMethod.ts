import type { UserDto } from 'common/types/user';
import { brandedId } from 'service/brandedId';
import { ulid } from 'ulid';
import type { ChatCreateServerVal, ChatSaveVal } from './chatType';

export const chatMethod = {
  create: (user: UserDto, val: ChatCreateServerVal): ChatSaveVal => {
    const chat = {
      id: brandedId.chat.entity.parse(ulid()),
      roomId: brandedId.room.entity.parse(val.roomId),
      authorId: brandedId.user.entity.parse(user.id),
      content: val.content,
      createdAt: Date.now(),
    };

    return {
      savable: true,
      chat,
    };
  },
};
