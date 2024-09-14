import type { DtoId } from 'common/types/brandedId';
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
    body: { name: 'test', password: 'test', status: 'PRIVATE' },
  });

  expect(res.status).toEqual(201);
  expect(res.body.status).toEqual('PRIVATE');
});

test(GET(noCookieClient.private.rooms.search), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms.search.get({ query: { name: 'test' } });

  expect(res.status).toEqual(200);
});

test(GET(noCookieClient.private.rooms.search), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms.search.get({ query: { createdAt: 0 } });

  expect(res.status).toEqual(200);
});

test(POST(noCookieClient.private.rooms.friends), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms.friends.post({
    body: { id: '1' as DtoId['room'], password: 'test' },
  });

  expect(res.status).toEqual(201);
  expect(res.body.status).toEqual('PRIVATE');
});

test(PUT(noCookieClient.private.rooms.friends), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms.friends.put({
    body: { name: 'test', password: 'test', status: 'PRIVATE' },
  });

  expect(res.status).toEqual(204);
});

test(PUT(noCookieClient.private.rooms._roomId('_roomId')), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms._roomId('_roomId').put({
    body: { name: 'test' },
  });

  expect(res.status).toEqual(204);
});

test(DELETE(noCookieClient.private.rooms._roomId('_roomId')), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms._roomId('_roomId').delete();

  expect(res.status).toEqual(204);
});
