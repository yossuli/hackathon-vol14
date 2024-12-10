import type { DefineMethods } from 'aspida';
import type { ChatDto } from 'common/types/chat';

export type Methods = DefineMethods<{
  get: {
    resBody: ChatDto[];
  };
}>;
