import type { MultipartFile } from '@fastify/multipart';
import type { EntityId } from 'service/brandedId';
import type { S3PutParams } from 'service/s3Client';

export type FireFlowerEntity = {
  id: EntityId['fireFlower'];
  name: string;
  description: string;
  imageKey: string | undefined;
  creator: {
    id: EntityId['user'];
    name: string;
  };
};

export type FireFlowerCreateServerVal = {
  name: string;
  description: string;
  image?: MultipartFile;
};

export type FireFlowerSaveVal = { fireFlower: FireFlowerEntity; s3Params?: S3PutParams };

export type FireFlowerDeleteVal = { deletable: boolean; fireFlower: FireFlowerEntity };
