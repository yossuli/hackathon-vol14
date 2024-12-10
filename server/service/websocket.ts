import type { FastifyPluginAsync } from 'fastify';

const websocketHandler: FastifyPluginAsync = async (fastify) => {
  fastify.get('/ws', { websocket: true }, (socket) => {
    const roomId = 'global-room';
    console.log('Client connected to WebSocket');

    socket.on('message', (message) => {
      const messageText = message.toString();
      console.log('Message received:', message.toString());
      socket.send(`Echo from room ${roomId}: ${messageText}`);
    });

    socket.on('close', () => {
      console.log('Connection closed for room');
    });
  });
};

export default websocketHandler;
