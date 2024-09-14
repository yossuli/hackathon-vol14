export const APP_NAME = 'CATAPULT';

<<<<<<< HEAD
export const ID_NAME_LIST = ['user', 'task'] as const;
=======
export const ID_NAME_LIST = ['user', 'task', 'room'] as const;
>>>>>>> e601fd90e2004678d8452d899b67729cfe7498c0

export const IS_PROD = process.env.NODE_ENV === 'production';

const listToDict = <T extends readonly [string, ...string[]]>(list: T): { [U in T[number]]: U } =>
  list.reduce((dict, type) => ({ ...dict, [type]: type }), {} as { [U in T[number]]: U });

export const ID_NAMES = listToDict(ID_NAME_LIST);
