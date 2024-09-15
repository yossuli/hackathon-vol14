import type { DtoId } from 'common/types/brandedId';
import { expect, test } from 'vitest';
import { createSessionClients, noCookieClient } from '../apiClient';
import { GET, POST } from '../utils';
import { DELETE } from './../utils';

test(GET(noCookieClient.private.fireFlowers), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.fireFlowers.get();

  expect(res.status).toEqual(200);
});

test(POST(noCookieClient.private.fireFlowers), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.fireFlowers.post({ body: '' });

  expect(res.status).toEqual(201);
});

test(DELETE(noCookieClient.private.fireFlowers), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.fireFlowers.delete({
    body: { id: 'fireFlowerId' as DtoId['fireFlower'] },
  });

  expect(res.status).toEqual(200);
});

test(GET(noCookieClient.private.fireFlowers._fireId('fireFlowerId')), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.fireFlowers._fireId('fireFlowerId').get({
    body: '',
  });

  expect(res.status).toEqual(200);
});

test(POST(noCookieClient.private.fireFlowers._fireId('fireFlowerId')), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.fireFlowers._fireId('fireFlowerId').post({
    body: { id: 'fireFlowerId' as DtoId['fireFlower'], update: { name: 'updatedName' } },
  });

  expect(res.status).toEqual(201);
});

test(POST(noCookieClient.private.fireFlowers._fireId('fireFlowerId').share), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.fireFlowers._fireId('fireFlowerId').share.post({
    body: { id: 'fireFlowerId' as DtoId['fireFlower'], userId: 'userId' as DtoId['user'] },
  });

  expect(res.status).toEqual(201);
  expect(res.body).toHaveProperty('success', true);
});

test(POST(noCookieClient.private.fireFlowers._fireId('fireFlowerId').like), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.fireFlowers._fireId('fireFlowerId').like.post({
    body: { id: 'fireFlowerId' as DtoId['fireFlower'] },
  });

  expect(res.status).toEqual(201);
  expect(res.body).toHaveProperty('success', true);
});

test(DELETE(noCookieClient.private.fireFlowers._fireId('fireFlowerId').like), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.fireFlowers._fireId('fireFlowerId').like.delete({
    body: { id: 'fireFlowerId' as DtoId['fireFlower'] },
  });

  expect(res.status).toEqual(201);
  expect(res.body).toHaveProperty('success', true);
});
