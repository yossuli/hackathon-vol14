import { SERVER_PORT } from 'service/envValues';

export const TEST_PORT = SERVER_PORT - 1;

export const GET = (api: { get: unknown; $path: () => string }): string => `GET: ${api.$path()}`;

export const POST = (api: { post: unknown; $path: () => string }): string => `POST: ${api.$path()}`;

<<<<<<< HEAD
=======
export const PUT = (api: { put: unknown; $path: () => string }): string => `PUT: ${api.$path()}`;

>>>>>>> be9c2bfa585ad8e212caf4e29dc64b3bc7854ecb
export const PATCH = (api: { patch: unknown; $path: () => string }): string =>
  `PATCH: ${api.$path()}`;

export const DELETE = (api: { delete: unknown; $path: () => string }): string =>
  `DELETE: ${api.$path()}`;
