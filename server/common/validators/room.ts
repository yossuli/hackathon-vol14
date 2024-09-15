import { RoomStatus } from '@prisma/client';
import { z } from 'zod';

export const roomNameValidator = z
  .string()
  .min(1, '部屋名を入力してください')
  .max(20, '部屋名は20文字以内です');

export const roomPasswordValidator = z.optional(
  z
    .string()
    .min(4, 'パスワードは4文字以上です')
    .max(20, 'パスワードは20文字以内です')
    .regex(
      /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{4,20}$/i,
      'パスワードは半角英数字をそれぞれ1文字以上含めてください',
    ),
);

export const roomStatusValidator = z.nativeEnum(RoomStatus);
