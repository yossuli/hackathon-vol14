/* eslint-disable max-lines */
import type { DtoId } from 'common/types/brandedId';
import { expect, test } from 'vitest';
import { createSessionClients, noCookieClient } from '../apiClient';
import { GET, PATCH, POST } from '../utils';
import { DELETE } from './../utils';

test(GET(noCookieClient.private.fireFlowers), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.fireFlowers.get();

  expect(res.status).toEqual(200);
});

test(POST(noCookieClient.private.fireFlowers), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.fireFlowers.post({
    body: {
      name: 'test',
    },
  });

  expect(res.status).toEqual(201);
  expect(res.body.structure.length).toBe(7);
});

test(GET(noCookieClient.private.fireFlowers), async () => {
  const apiClient = await createSessionClients();
  const fireFlower = await apiClient.private.fireFlowers.post({
    body: {
      name: 'test',
    },
  });
  const res = await apiClient.private.fireFlowers.get();

  expect(res.status).toEqual(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0].id).toBe(fireFlower.body.id);
});

test(DELETE(noCookieClient.private.fireFlowers), async () => {
  const apiClient = await createSessionClients();

  const fireFlower = await apiClient.private.fireFlowers.post({
    body: {
      name: 'test',
    },
  });

  const res = await apiClient.private.fireFlowers.delete({
    body: { id: fireFlower.body.id },
  });

  expect(res.status).toEqual(200);
});

test(DELETE(noCookieClient.private.fireFlowers), async () => {
  const apiClient = await createSessionClients();

  const fireFlowers = await Promise.all([
    apiClient.private.fireFlowers.post({
      body: {
        name: 'test',
      },
    }),
    apiClient.private.fireFlowers.post({
      body: {
        name: 'test',
      },
    }),
  ]);
  const getRes = await apiClient.private.fireFlowers.get();

  const deleteRes = await apiClient.private.fireFlowers.delete({
    body: { id: fireFlowers[0].body.id },
  });

  const getRes2 = await apiClient.private.fireFlowers.get();

  expect(getRes.status).toEqual(200);
  expect(getRes.body.length).toBe(2);
  expect(deleteRes.status).toEqual(200);
  expect(getRes2.status).toEqual(200);
  expect(getRes2.body.length).toBe(1);
  expect(getRes2.body[0].id).toBe(fireFlowers[1].body.id);
});

test(GET(noCookieClient.private.fireFlowers._fireId('fireFlowerId')), async () => {
  const apiClient = await createSessionClients();
  const fireFlower = await apiClient.private.fireFlowers.post({
    body: {
      name: 'test',
    },
  });
  const res = await apiClient.private.fireFlowers._fireId(fireFlower.body.id).get();

  expect(res.status).toEqual(200);
});

test(PATCH(noCookieClient.private.fireFlowers._fireId('fireFlowerId')), async () => {
  const apiClient = await createSessionClients();

  const fireFlower = await apiClient.private.fireFlowers.post({
    body: {
      name: 'test',
    },
  });

  const res = await apiClient.private.fireFlowers._fireId(fireFlower.body.id).patch({
    body: { name: 'updatedName' },
  });

  const res2 = await apiClient.private.fireFlowers.get();

  expect(res.status).toEqual(201);
  expect(res2.body[0].id).toEqual(fireFlower.body.id);
  expect(res2.body[0].name).toEqual('updatedName');
});

test(PATCH(noCookieClient.private.fireFlowers._fireId('fireFlowerId')), async () => {
  const apiClient = await createSessionClients();

  const fireFlower = await apiClient.private.fireFlowers.post({
    body: {
      name: 'test',
    },
  });

  const res = await apiClient.private.fireFlowers._fireId(fireFlower.body.id).patch({
    body: { structure: [['#0f0']] },
  });

  const res2 = await apiClient.private.fireFlowers.get();

  expect(res.status).toEqual(201);
  expect(res2.body[0].id).toEqual(fireFlower.body.id);
  expect(res2.body[0].structure).toEqual([['#0f0']]);
});

test(POST(noCookieClient.private.fireFlowers._fireId('fireFlowerId').share), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.fireFlowers._fireId('fireFlowerId').share.post({
    body: { id: 'fireFlowerId' as DtoId['fireFlower'], userId: 'userId' as DtoId['user'] },
  });

  expect(res.status).toEqual(201);
  expect(res.body).toHaveProperty('success', true);
});

test(GET(noCookieClient.private.fireFlowers.favorites), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.fireFlowers.favorites.get();

  expect(res.status).toEqual(200);
  expect(res.body.length).toBe(0);
});

test(PATCH(noCookieClient.private.fireFlowers._fireId('fireFlowerId').like), async () => {
  const apiClient = await createSessionClients();
  const fireFlower = await apiClient.private.fireFlowers.$post({
    body: {
      name: 'test',
    },
  });

  const res = await apiClient.private.fireFlowers._fireId(fireFlower.id).like.patch();

  const res2 = await apiClient.private.fireFlowers.favorites.get();

  await apiClient.private.fireFlowers._fireId(fireFlower.id).like.patch();

  const res3 = await apiClient.private.fireFlowers.favorites.get();

  expect(res.status).toEqual(201);
  expect(res.body).toHaveProperty('success', true);
  expect(res2.status).toEqual(200);
  expect(res2.body.length).toBe(1);
  expect(res3.status).toEqual(200);
  expect(res3.body.length).toBe(0);
});

test(GET(noCookieClient.private.fireFlowers.own), async () => {
  const apiClient = await createSessionClients();
  const apiClient2 = await createSessionClients();

  const fireFlower = await apiClient.private.fireFlowers.$post({
    body: {
      name: 'test',
    },
  });
  await apiClient2.private.fireFlowers.$post({
    body: {
      name: 'test',
    },
  });

  const res = await apiClient.private.fireFlowers.own.get();

  expect(res.status).toEqual(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0].id).toBe(fireFlower.id);
});
