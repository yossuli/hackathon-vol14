import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    return {
      status: 201,
      body: { success: true },
    };
  },
}));
