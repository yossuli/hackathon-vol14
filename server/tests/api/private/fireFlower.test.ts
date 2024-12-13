/* eslint-disable max-lines */
import type { DtoId } from 'common/types/brandedId';
import { expect, test } from 'vitest';
import { createSessionClients, noCookieClient } from '../apiClient';
import { DELETE, GET, PATCH, POST } from '../utils';

// 花火一覧空取得テスト
test(GET(noCookieClient.private.fireFlowers), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.fireFlowers.get();

  expect(res.status).toEqual(200);
});

// 花火作成テスト
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

// 花火作成取得複合テスト
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

// 花火削除テスト
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

// 花火作成複数取得削除複合テスト
test(DELETE(noCookieClient.private.fireFlowers), async () => {
  const apiClient = await createSessionClients();

  // 花火を複数作成
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
  // 花火を複数取得
  const getRes = await apiClient.private.fireFlowers.get();
  // 花火を削除
  const deleteRes = await apiClient.private.fireFlowers.delete({
    body: { id: fireFlowers[0].body.id },
  });
  // 花火が減ったことを確認
  const getRes2 = await apiClient.private.fireFlowers.get();

  expect(getRes.status).toEqual(200);
  expect(getRes.body.length).toBe(2);
  expect(deleteRes.status).toEqual(200);
  expect(getRes2.status).toEqual(200);
  expect(getRes2.body.length).toBe(1);
  expect(getRes2.body[0].id).toBe(fireFlowers[1].body.id);
});

// 指定した花火を取得テスト
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

// 指定した花火の名前更新テスト
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

// 指定した花火の構造更新テスト
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

// お気に入り取得テスト
test(GET(noCookieClient.private.fireFlowers.favorites), async () => {
  const apiClient = await createSessionClients();
  const res = await apiClient.private.fireFlowers.favorites.get();

  expect(res.status).toEqual(200);
  expect(res.body.length).toBe(0);
});

// お気に入り更新テスト
test(PATCH(noCookieClient.private.fireFlowers._fireId('fireFlowerId').like), async () => {
  const apiClient = await createSessionClients();
  const fireFlower = await apiClient.private.fireFlowers.$post({
    body: {
      name: 'test',
    },
  });

  // お気に入り登録
  const res = await apiClient.private.fireFlowers._fireId(fireFlower.id).like.patch();
  // お気に入り取得
  const res2 = await apiClient.private.fireFlowers.favorites.get();
  // お気に入り解除
  await apiClient.private.fireFlowers._fireId(fireFlower.id).like.patch();
  // お気に入り解除を確認
  const res3 = await apiClient.private.fireFlowers.favorites.get();

  expect(res.status).toEqual(201);
  expect(res.body).toHaveProperty('success', true);
  expect(res2.status).toEqual(200);
  expect(res2.body.length).toBe(1);
  expect(res3.status).toEqual(200);
  expect(res3.body.length).toBe(0);
});

// 自作の花火取得テスト
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

// ランダムな花火取得テスト
test(GET(noCookieClient.private.fireFlowers.random), async () => {
  const seedApiClient = await createSessionClients();
  const apiClient = await createSessionClients();
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
  await Promise.all(
    names.map((name) =>
      apiClient.private.fireFlowers.post({
        body: {
          name,
        },
      }),
    ),
  );
  const res = await apiClient.private.fireFlowers.random.get();

  expect(res.status).toEqual(200);
  expect(res.body.length).toBe(10);
  expect(res.body.every((fireFlower) => names.includes(fireFlower.name))).toBe(true);
  const res2 = await Promise.all(
    res.body.map(({ id }) =>
      apiClient.private.fireFlowers
        ._fireId(id)
        .patch({ body: { name: 'updated' } })
        .then(() => false)
        .catch(() => true),
    ),
  );
  expect(res2.every((res) => res)).toBe(true);
});
