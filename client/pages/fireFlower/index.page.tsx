import { useEffect, useState } from 'react';
import styles from './index.module.css';

const convertToCircleLine = (
  matrix: (string | null)[][],
  layerFromTheSurface: number,
  result: (string | null)[][],
  time: number,
) => {
  const sideLength = matrix.length;
  const upperSide = matrix[layerFromTheSurface].slice(
    layerFromTheSurface,
    sideLength - layerFromTheSurface,
  );

  const bottomSide = [
    ...matrix[sideLength - 1 - layerFromTheSurface].slice(
      layerFromTheSurface,
      sideLength - layerFromTheSurface,
    ),
  ].reverse();

  const leftSide = matrix
    .map((row) => row[layerFromTheSurface])
    .flat()
    .slice(layerFromTheSurface, sideLength - layerFromTheSurface);

  const rightSide = [
    ...matrix
      .map((row) => row[sideLength - 1 - layerFromTheSurface])
      .flat()
      .slice(layerFromTheSurface, sideLength - layerFromTheSurface),
  ].reverse();

  const zhou =
    upperSide.length === 1
      ? upperSide
      : upperSide
          .slice(0, -1)
          .concat(rightSide)
          .slice(0, -1)
          .concat(bottomSide)
          .slice(0, -1)
          .concat(leftSide.slice(0, -1));
  const l = zhou.length;
  const r = result.length / 2 - layerFromTheSurface * 2;
  const rr = r * (time / 4);
  const RAdjuster = (cos: number) => +(cos < 0);
  const BAdjuster = (sin: number) => +(sin < 0);
  zhou.forEach((color, n) => {
    result[
      Math.round(Math.sin(Math.PI * (n / l - 3 / 8) * 2) * rr + r - 1) +
        layerFromTheSurface * 2 + //
        //
        RAdjuster(Math.sin(Math.PI * (n / l - 3 / 8) * 2))
    ][
      Math.round(Math.cos(Math.PI * (n / l - 3 / 8) * 2) * rr + r - 1) +
        layerFromTheSurface * 2 + //
        //
        BAdjuster(Math.cos(Math.PI * (n / l - 3 / 8) * 2))
    ] = color;
  });
};

// eslint-disable-next-line complexity
const convertToCircle = (matrix: (string | null)[][], time: number): (string | null)[][] => {
  const diameter = matrix.length + 2;
  const radius = diameter / 2;
  const result: (string | null)[][] = Array.from({ length: diameter * 2 }, () =>
    Array(diameter * 2).fill('#0000'),
  );

  if (time === 0) {
    return result;
  }

  let i;
  for (i = Math.ceil(radius - 3); i >= 0; i--) {
    convertToCircleLine(matrix, i, result, time);
  }
  if (matrix.length % 2 === 0) {
    convertToCircleLine(matrix, Math.max(0, i), result, time);
  } else {
    result[Math.ceil(radius - 1) * 2][Math.ceil(radius - 1) * 2] =
      matrix[Math.ceil(radius - 2)][Math.ceil(radius - 2)];
  }
  return result;
};

const PIXEL_SIZE = 30; // ドットのサイズ

interface FireFlowerProps {
  shape: (string | null)[][];
  x: number;
}

export const FireFlower: React.FC<FireFlowerProps> = ({ shape, x }) => {
  const [time, setTime] = useState(-20);

  useEffect(() => {
    if (time > 3) {
      return;
    }
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [time]);

  // useEffect(() => {
  //   setTime(-20);
  // }, [shape]);

  if (shape === undefined) return null;
  const circularShape = convertToCircle(shape, Math.max(0, time));
  // ピクセルごとのボックスシャドウを生成する関数
  const generateBoxShadows = (shape: (string | null)[][]): string => {
    return shape
      .map((row, y) =>
        // eslint-disable-next-line complexity
        row.map((color, x) => {
          if (color === null) return null;
          return `${x * PIXEL_SIZE}px ${y * PIXEL_SIZE}px ${color}`;
        }),
      )
      .flat()
      .filter(Boolean)
      .join(',');
  };

  // circularShapeの行数・列数から、全体のサイズを計算
  const boxWidth = circularShape[0].length * PIXEL_SIZE;
  const boxHeight = circularShape.length * PIXEL_SIZE;

  const boxShadowStyle: React.CSSProperties = {
    width: `${PIXEL_SIZE}px`,
    height: `${PIXEL_SIZE}px`,
    boxShadow: generateBoxShadows(circularShape),
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-${boxWidth / 2 - x * 100}px,-${boxHeight / 2}px)`,
  };

  return (
    <div className={styles.main}>
      <div className={styles.fireFlower} style={boxShadowStyle}></div>
    </div>
  );
};
