import { expect, test } from 'vitest';
import { createSessionClients, noCookieClient } from '../apiClient';
import { DELETE, GET, POST, PUT } from '../utils';

test(GET(noCookieClient.private.rooms), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms.get();

  expect(res.status).toEqual(200);
});

test(POST(noCookieClient.private.rooms), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms.post({
    body: { name: 'test', password: 'test1234', status: 'PRIVATE' },
  });

  expect(res.status).toEqual(201);
  expect(res.body.status).toEqual('PRIVATE');
});

test(POST(noCookieClient.private.rooms), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms.post({
    body: { name: 'test', status: 'PUBLIC' },
  });

  expect(res.status).toEqual(201);
  expect(res.body.status).toEqual('PUBLIC');
});

test(GET(noCookieClient.private.rooms), async () => {
  const apiClient = await createSessionClients();
  await apiClient.private.rooms.post({
    body: { name: 'test', password: 'test1234', status: 'PRIVATE' },
  });
  const room = await apiClient.private.rooms.post({
    body: { name: 'test', status: 'PUBLIC' },
  });

  const res = await apiClient.private.rooms.get();

  expect(res.status).toEqual(200);
  expect(res.body.length).toEqual(1);
  expect(res.body[0].status).toEqual('PUBLIC');
  expect(res.body[0].id).toEqual(room.body.id);
});

test(GET(noCookieClient.private.rooms.search), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms.search.get({ query: { name: 'test' } });

  expect(res.status).toEqual(200);
});

test(GET(noCookieClient.private.rooms.search), async () => {
  const apiClient = await createSessionClients();
  const room = await apiClient.private.rooms.$post({
    body: { name: 'test', status: 'PUBLIC' },
  });
  const res = await apiClient.private.rooms.search.get({ query: { name: 'test' } });

  expect(res.status).toEqual(200);
  expect(res.body.length).toEqual(1);
  expect(res.body[0].status).toEqual('PUBLIC');
  expect(res.body[0].id).toEqual(room.id);
});

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

test(DELETE(noCookieClient.private.rooms._roomId('_roomId')), async () => {
  const apiClient = await createSessionClients();
  const room = await apiClient.private.rooms.post({
    body: { name: 'test', password: 'test1234', status: 'PRIVATE' },
  });

  const res = await apiClient.private.rooms._roomId(room.body.id).delete();

  expect(res.status).toEqual(204);
});
