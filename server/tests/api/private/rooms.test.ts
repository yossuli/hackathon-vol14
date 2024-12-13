import { expect, test } from 'vitest';
import { createSessionClients, noCookieClient } from '../apiClient';
import { DELETE, GET, POST, PUT } from '../utils';

// 取得テスト
test(GET(noCookieClient.private.rooms), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms.get();

  expect(res.status).toEqual(200);
});

// プライベートルーム作成テスト
test(POST(noCookieClient.private.rooms), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms.post({
    body: { name: 'test', password: 'test1234', status: 'PRIVATE' },
  });

  expect(res.status).toEqual(201);
  expect(res.body.status).toEqual('PRIVATE');
});

// パブリックルーム作成テスト
test(POST(noCookieClient.private.rooms), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms.post({
    body: { name: 'test', status: 'PUBLIC' },
  });

  expect(res.status).toEqual(201);
  expect(res.body.status).toEqual('PUBLIC');
});

// パブリックルームのみ取得テスト
test(GET(noCookieClient.private.rooms), async () => {
  const apiClient = await createSessionClients();
  await apiClient.private.rooms.post({
    body: { name: 'test', password: 'test1234', status: 'PRIVATE' },
  });
  const room = await apiClient.private.rooms.post({
    body: { name: 'test', status: 'PUBLIC' },
  });
  const room2 = await apiClient.private.rooms.post({
    body: { name: 'test2', status: 'PUBLIC' },
  });

  const res = await apiClient.private.rooms.get();

  expect(res.status).toEqual(200);
  expect(res.body.length).toEqual(2);
  expect(res.body[0].status).toEqual('PUBLIC');
  expect(res.body[0].id).toEqual(room2.body.id);
  expect(res.body[1].status).toEqual('PUBLIC');
  expect(res.body[1].id).toEqual(room.body.id);
});

// プライベートルーム入室テスト
test(POST(noCookieClient.private.rooms.friends), async () => {
  const apiClient = await createSessionClients();

  const room = await apiClient.private.rooms.post({
    body: { name: 'test', password: 'test1234', status: 'PRIVATE' },
  });
  const res = await apiClient.private.rooms.friends.post({
    body: { id: room.body.id, password: 'test1234' },
  });

  expect(res.status).toEqual(201);
  expect(res.body.status).toEqual('PRIVATE');
  expect(res.body.id).toEqual(room.body.id);
});

// パブリックルーム入退出テスト
test(POST(noCookieClient.private.rooms._roomId('_roomId')), async () => {
  const apiClient = await createSessionClients();
  const seedApiClient = await createSessionClients();
  const names = Array.from({ length: 20 }, (_, i) => `sampleFireFlower${i}`);
  await Promise.all(
    names.map((name) =>
      seedApiClient.private.fireFlowers.post({
        body: {
          name,
        },
      }),
    ),
  );
  const randomFireFlower = await apiClient.private.fireFlowers.random.$get();
  const room = await apiClient.private.rooms.$post({
    body: { name: 'test', status: 'PUBLIC' },
  });
  // 入室
  const res = await apiClient.private.rooms._roomId(room.id).post({
    body: randomFireFlower.slice(0, 3).map(({ id }) => id),
  });
  // ルームのユーザー入室状況取得
  const res2 = await apiClient.private.rooms._roomId(room.id).$get();
  // 退出
  const res3 = await apiClient.private.rooms.delete();
  // ルームのユーザー入室状況取得
  const res4 = await apiClient.private.rooms._roomId(room.id).$get();

  expect(res.status).toEqual(201);
  expect(res.body.status).toEqual('PUBLIC');
  expect(res.body.id).toEqual(room.id);
  expect(res2).toHaveProperty('users');
  // 入室しているので1人
  expect(res2.users?.length).toEqual(1);
  expect(res2.fireFlowers.length).toEqual(3);
  expect(res3.status).toEqual(204);
  // 退出したので0人
  expect(res4.users?.length).toEqual(0);
});

// プライベートルーム名前変更テスト
test(PUT(noCookieClient.private.rooms._roomId('_roomId')), async () => {
  const apiClient = await createSessionClients();

  const room = await apiClient.private.rooms.post({
    body: { name: 'test', password: 'test1234', status: 'PRIVATE' },
  });
  const updateTime = Date.now();
  const res = await apiClient.private.rooms._roomId(room.body.id).put({
    body: { name: 'test2' },
  });
  const res2 = await apiClient.private.rooms.friends.post({
    body: { id: room.body.id, password: 'test1234' },
  });
  expect(room.body.createdAt).toBeLessThan(updateTime);
  expect(res.status).toEqual(204);
  expect(res2.status).toEqual(201);
  expect(res2.body.status).toEqual('PRIVATE');
  expect(res2.body.id).toEqual(room.body.id);
  expect(res2.body.name).toEqual('test2');
  expect(res2.body.updatedAt).toBeGreaterThan(updateTime);
});

// ルーム削除テスト
test(DELETE(noCookieClient.private.rooms._roomId('_roomId')), async () => {
  const apiClient = await createSessionClients();
  const room = await apiClient.private.rooms.post({
    body: { name: 'test', password: 'test1234', status: 'PRIVATE' },
  });

  const res = await apiClient.private.rooms._roomId(room.body.id).delete();

  expect(res.status).toEqual(204);
});
