import { z } from 'zod';

const colorArrayValidator = z
  .array(
    z
      .string()
      .regex(/#[0-9a-f]{3,6,4,8}/i, { message: '色指定が不正です' })
      .min(1, '列は1列以上です')
      .max(100, '列は100列以内です'),
  )
  .min(1, '行は1行以上です')
  .max(100, '行は100行以内です');

export const fireFlowerValidator = z.array(colorArrayValidator).superRefine((arr, ctx) => {
  const length = arr.length;
  for (const row of arr) {
    if (row.length !== length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '配列は正方形でなければなりません',
      });
      break;
    }
  }
});
