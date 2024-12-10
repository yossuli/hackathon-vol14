'use strict'; //?

import websocketPlugin from '@fastify/websocket';
import type { FastifyPluginAsync } from 'fastify';
import type { RawData } from 'ws';

const websocketHandler: FastifyPluginAsync = async (fastify) => {
  fastify.register(websocketPlugin);

  fastify.get('/ws', { websocket: true }, (socket) => {
    const roomId = 'global-room';

    console.log(`Client connected to room ${roomId}`);

    socket.on('message', (message: RawData) => {
      const messageText = message.toString(); // バイナリデータを文字列に変換
      console.log(`Message received in room ${roomId}:`, messageText);
      socket.send(`Echo from room ${roomId}: ${messageText}`);
    });

    socket.on('close', () => {
      console.log(`Connection closed for room ${roomId}`);
    });
  });
};

export default websocketHandler;
