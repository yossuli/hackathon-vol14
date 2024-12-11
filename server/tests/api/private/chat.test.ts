import { expect, test } from 'vitest';
import { createSessionClients, noCookieClient } from '../apiClient';
import { GET, POST } from '../utils';

// チャットの投稿テスト
test(POST(noCookieClient.private.chat._roomId('roomId')), async () => {
  const apiClient = await createSessionClients();
  const room = await apiClient.private.rooms.$post({
    body: {
      name: 'test-room',
      password: 'test1234',
      status: 'PRIVATE',
    },
  });
  const res = await apiClient.private.chat._roomId(room.id).post({
    body: { content: 'test' },
  });

  expect(res.status).toEqual(201);
});

// チャットの取得テスト
test(GET(noCookieClient.private.chat), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.chat.get();

  expect(res.status).toEqual(200);
  expect(res.body.length).toEqual(0);
});

// チャットの投稿と取得複合テスト
test(GET(noCookieClient.private.chat), async () => {
  const apiClient = await createSessionClients();
  // ルームの作成
  const room = await apiClient.private.rooms.$post({
    body: {
      name: 'test-room',
      password: 'test1234',
      status: 'PRIVATE',
    },
  });
  // チャットの投稿
  const chat = await apiClient.private.chat._roomId(room.id).post({
    body: { content: 'test' },
  });
  // チャットの取得
  const res = await apiClient.private.chat.get();

  expect(res.status).toEqual(200);
  expect(res.body.length).toEqual(1);
  expect(res.body[0].id).toEqual(chat.body.id);
  expect(res.body[0].content).toEqual(chat.body.content);
  expect(res.body[0].author.name).toEqual(chat.body.author.name);
});
