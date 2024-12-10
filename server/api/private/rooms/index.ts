import type { FastifyInstance } from 'fastify';
import websocketHandler from './ws/websocket';

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.register(websocketHandler, { prefix: '/api/private/rooms/ws' });
}
