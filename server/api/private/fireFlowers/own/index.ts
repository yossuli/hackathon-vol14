import type { DefineMethods } from 'aspida';
import type { FireFlowerDto } from 'common/types/fireFlower';

export type Methods = DefineMethods<{
  get: {
    resBody: FireFlowerDto[];
  };
}>;
