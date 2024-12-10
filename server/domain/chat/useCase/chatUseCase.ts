import type { ChatDto } from 'common/types/chat';
import type { UserDto } from 'common/types/user';
import { transaction } from 'service/prismaClient';
import { chatMethod } from '../model/chatMethod';
import type { ChatCreateServerVal } from '../model/chatType';
import { chatCommand } from '../repository/chatCommand';
import { toChatDto } from '../service/toChatDto';

export const chatUseCase = {
  create: async (user: UserDto, val: ChatCreateServerVal): Promise<ChatDto> =>
    transaction('RepeatableRead', async (tx) => {
      const created = chatMethod.create(user, val);

      await chatCommand.save(tx, created);

      return toChatDto(created.chat);
    }),
};
