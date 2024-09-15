export const APP_NAME = 'CATAPULT';

<<<<<<< HEAD
export const ID_NAME_LIST = ['user', 'task'] as const;
=======
export const ID_NAME_LIST = ['user', 'task', 'room'] as const;
>>>>>>> be9c2bfa585ad8e212caf4e29dc64b3bc7854ecb

export const IS_PROD = process.env.NODE_ENV === 'production';

const listToDict = <T extends readonly [string, ...string[]]>(list: T): { [U in T[number]]: U } =>
  list.reduce((dict, type) => ({ ...dict, [type]: type }), {} as { [U in T[number]]: U });

export const ID_NAMES = listToDict(ID_NAME_LIST);
