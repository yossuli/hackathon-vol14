import type { DefineMethods } from 'aspida';
import type { ChatDto } from 'common/types/chat';

export type Methods = DefineMethods<{
  post: {
    status: 201;
    reqBody: {
      content: string;
    };
    resBody: ChatDto;
  };
}>;
