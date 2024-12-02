import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body: _body }) => {
    return {
      status: 201,
      body: { success: true },
    };
  },
  delete: async ({ body: _body }) => {
    return {
      status: 201,
      body: { success: true },
    };
  },
}));
