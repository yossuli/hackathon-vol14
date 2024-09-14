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

test(GET(noCookieClient.private.rooms.search), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms.search.get({ query: { name: 'test' } });

  expect(res.status).toEqual(200);
});

test(PUT(noCookieClient.private.rooms.friends), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.rooms.friends.put({
    body: { name: 'test', password: 'test1234', status: 'PRIVATE' },
  });

  expect(res.status).toEqual(200);
});

test(POST(noCookieClient.private.rooms.friends), async () => {
  const apiClient = await createSessionClients();

  const room = await apiClient.private.rooms.friends.put({
    body: { name: 'test', password: 'test1234', status: 'PRIVATE' },
  });
  const res = await apiClient.private.rooms.friends.post({
    body: { id: room.body.id, password: 'test1234' },
  });

  expect(res.status).toEqual(201);
  expect(res.body.status).toEqual('PRIVATE');
});

// test(POST(noCookieClient.private.rooms.friends), async () => {
//   const apiClient = await createSessionClients();

//   const res = await apiClient.private.rooms.friends.post({
//     body: { id: '1' as DtoId['room'], password: 'test1234' },
//   });

//   expect(res.status).toEqual(403);
// });

test(PUT(noCookieClient.private.rooms._roomId('_roomId')), async () => {
  const apiClient = await createSessionClients();

  const room = await apiClient.private.rooms.post({
    body: { name: 'test', password: 'test1234', status: 'PRIVATE' },
  });

  const res = await apiClient.private.rooms._roomId(room.body.id).put({
    body: { name: 'test' },
  });

  expect(res.status).toEqual(204);
});

test(DELETE(noCookieClient.private.rooms._roomId('_roomId')), async () => {
  const apiClient = await createSessionClients();
  const room = await apiClient.private.rooms.post({
    body: { name: 'test', password: 'test1234', status: 'PRIVATE' },
  });

  const res = await apiClient.private.rooms._roomId(room.body.id).delete();

  expect(res.status).toEqual(204);
});

// test(DELETE(noCookieClient.private.rooms._roomId('_roomId')), async () => {
//   const apiClient = await createSessionClients();

//   const res = await apiClient.private.rooms._roomId('1').delete();

//   expect(res.status).toEqual(403);
// });
