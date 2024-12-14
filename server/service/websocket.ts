import type { FireFlowerEntity } from 'domain/fireFlower/model/fireFlowerType';
import { fireFlowerQuery } from 'domain/fireFlower/repository/fireFlowerQuery';
import { roomQuery } from 'domain/rooms/repository/roomQuery';
import type { FastifyPluginAsync } from 'fastify';
import { WebSocket } from 'ws';
import { brandedId } from './brandedId';
import { prismaClient } from './prismaClient';

const websocketHandler: FastifyPluginAsync = async (fastify) => {
  // すべてのクライアントを追跡
  const clients = new Set<WebSocket>();
  const room = await roomQuery.listByCreatedAt(prismaClient).then((rooms) => rooms[0]);
  let fireFlowers: FireFlowerEntity[];

  fastify.get('/ws', { websocket: true }, (socket) => {
    // クライアントをセットに追加
    clients.add(socket);
    console.log('Client connected. Total clients:', clients.size);

    // メッセージ受信時に全クライアントにブロードキャスト
    socket.on('message', (message) => {
      console.log('Message received:', message.toString());
      for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
          const returnMessage = JSON.stringify({
            message: {
              type: 'message',
              message: message.toString(),
            },
          });
          client.send(returnMessage);
        }
      }
    });
    // 定期的に花火を更新
    let time2 = 0;
    time2 = Math.floor(Math.random() * 10000) + 10000;
    const interval2 = setInterval(async () => {
      console.log('room?.id', room?.id);
      fireFlowers = await fireFlowerQuery.findByRoomId(
        prismaClient,
        brandedId.room.dto.parse(room?.id),
      );
    }, time2);

    // 定期的に花火をブロードキャスト
    let time = 0;
    time = Math.floor(Math.random() * 4000) + 1000;
    const interval = setInterval(() => {
      console.log('fireFlowers', fireFlowers);
      if (!fireFlowers) return;
      const message = JSON.stringify({
        message: {
          type: 'fireFlower',
          fireFlower: fireFlowers[Math.floor(Math.random() * fireFlowers.length)],
          x: Math.floor(Math.random() * 100),
        },
      });
      for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      }
    }, time);

    // ソケットが閉じられたときにインターバルをクリア
    socket.on('close', () => {
      clearInterval(interval);
      clearInterval(interval2);
    });

    // クライアント切断時
    socket.on('close', () => {
      clients.delete(socket);
      console.log('Client disconnected. Total clients:', clients.size);
    });
  });
};

export default websocketHandler;
