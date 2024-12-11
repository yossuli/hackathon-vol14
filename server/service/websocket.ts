import type { FastifyPluginAsync } from 'fastify';
import { WebSocket } from 'ws';

const websocketHandler: FastifyPluginAsync = async (fastify) => {
  // すべてのクライアントを追跡
  const clients = new Set<WebSocket>();

  fastify.get('/ws', { websocket: true }, (socket) => {
    // クライアントをセットに追加
    clients.add(socket);
    console.log('Client connected. Total clients:', clients.size);

    // メッセージ受信時に全クライアントにブロードキャスト
    socket.on('message', (message) => {
      console.log('Message received:', message.toString());
      for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      }
    });

    // クライアント切断時
    socket.on('close', () => {
      clients.delete(socket);
      console.log('Client disconnected. Total clients:', clients.size);
    });
  });
};

export default websocketHandler;
