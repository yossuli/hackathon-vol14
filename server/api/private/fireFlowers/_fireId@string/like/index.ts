import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  patch: {
    status: 201;
    resBody: { success: boolean };
  };
}>;
