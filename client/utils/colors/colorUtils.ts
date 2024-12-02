import type { HSL } from './types';

//eslint-disable-next-line complexity
const hexToHSL = (hex: string): HSL => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}. Please provide a valid hex color like #RRGGBB.`);
  }

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToHex = ({ h, s, l }: HSL): string => {
  //eslint-disable-next-line no-param-reassign
  s /= 100;
  //eslint-disable-next-line no-param-reassign
  l /= 100;

  //eslint-disable-next-line complexity
  const hueToRgb = (p: number, q: number, t: number): number => {
    //eslint-disable-next-line no-param-reassign
    if (t < 0) t += 1;
    //eslint-disable-next-line no-param-reassign
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hueToRgb(p, q, h / 360 + 1 / 3);
  const g = hueToRgb(p, q, h / 360);
  const b = hueToRgb(p, q, h / 360 - 1 / 3);

  const toHex = (x: number): string => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const darkenColor = (hexColor: string | null, percentage: number): string => {
  if (!hexColor || hexColor === '') {
    return '#000000';
  }

  const normalizedColor =
    hexColor.length === 4
      ? `#${hexColor[1]}${hexColor[1]}${hexColor[2]}${hexColor[2]}${hexColor[3]}${hexColor[3]}`
      : hexColor;

  try {
    const hsl = hexToHSL(normalizedColor);
    hsl.l = Math.max(0, hsl.l * (1 - percentage / 100));
    return hslToHex(hsl);
  } catch (error) {
    return '#000000';
  }
};
