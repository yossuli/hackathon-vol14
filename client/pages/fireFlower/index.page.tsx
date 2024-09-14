import { useEffect, useState } from 'react';
import styles from './index.module.css';

const convertToCircleLine = (
  matrix: number[][],
  layerFromTheSurface: number,
  result: number[][],
  time: number,
) => {
  const sideLength = matrix.length;
  const upperSide = matrix[layerFromTheSurface].slice(
    layerFromTheSurface,
    sideLength - layerFromTheSurface,
  );

  const bottomSide = matrix[sideLength - 1 - layerFromTheSurface]
    .slice(layerFromTheSurface, sideLength - layerFromTheSurface)
    .toReversed();

  const leftSide = matrix
    .map((row) => row[layerFromTheSurface])
    .flat()
    .slice(layerFromTheSurface, sideLength - layerFromTheSurface);

  const rightSide = matrix
    .map((row) => row[sideLength - 1 - layerFromTheSurface])
    .flat()
    .slice(layerFromTheSurface, sideLength - layerFromTheSurface)
    .toReversed();

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

// const moveCellsDown = (matrix: number[][]): number[][] => {
//   const diameter = matrix.length;
//   const result: number[][] = matrix;
//   console.log(result);

//   for (let i = 0; i < diameter; i++) {
//     for (let j = 0; j < diameter; j++) {
//       if (matrix[i][j] !== undefined) {
//         const randomValue = Math.random();

//         // 2マス下に移動する確率
//         if (i + 2 < diameter && randomValue < 0.2) {
//           result[i + 1][j] = matrix[i][j];
//         }
//       }
//     }
//   }
//   console.log(result);

//   return result;
// };

// eslint-disable-next-line complexity
const convertToCircle = (matrix: number[][], time: number): number[][] => {
  const diameter = matrix.length + 2;
  const radius = diameter / 2;
  const result: number[][] = Array.from({ length: diameter * 2 }, () =>
    Array(diameter * 2).fill(0),
  );
  if (time === 0) {
    return result;
  }
  // else if (time > 4) {
  //   console.log(matrix);
  //   const result2 = convertToCircle(matrix, 4);
  //   const fireFlower = moveCellsDown(result2);
  //   return fireFlower;
  // }
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

const FireFlower = () => {
  const shape: number[][] = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 3, 3, 3, 3, 3, 1],
    [1, 3, 4, 4, 4, 3, 1],
    [1, 3, 4, 2, 4, 3, 1],
    [1, 3, 4, 4, 4, 3, 1],
    [1, 3, 3, 3, 3, 3, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  // const shape1: number[][] = [
  //   [1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 3, 3, 3, 3, 3, 3, 1],
  //   [1, 3, 4, 4, 4, 4, 3, 1],
  //   [1, 3, 4, 2, 2, 4, 3, 1],
  //   [1, 3, 4, 2, 2, 4, 3, 1],
  //   [1, 3, 4, 4, 4, 4, 3, 1],
  //   [1, 3, 3, 3, 3, 3, 3, 1],
  //   [1, 1, 1, 1, 1, 1, 1, 1],
  // ];
  // const shape2: number[][] = [
  //   [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2],
  //   [2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
  //   [2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
  //   [2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
  //   [2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
  //   [2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
  //   [2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
  //   [2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
  //   [2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
  //   [2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
  //   [2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
  //   [2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
  //   [2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2],
  //   [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  //   [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2],
  // ];

  // const shape3: number[][] = [
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 1, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0],
  // ];

  const [time, setTime] = useState(0);
  const circularShape = convertToCircle(shape, time);
  useEffect(() => {
    if (time > 3) {
      return;
    }
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className={styles.main}>
      <div className={styles.fireFlower} style={{ width: `${circularShape.length * 30}px` }}>
        {circularShape.map((row, _) =>
          row.map((number, _) => (
            <div
              style={{
                backgroundColor:
                  number === 1
                    ? 'red'
                    : number === 2
                      ? 'blue'
                      : number === 3
                        ? 'green'
                        : number === 4
                          ? 'yellow'
                          : '',
              }}
              className={styles.dot}
            ></div>
          )),
        )}
      </div>
    </div>
  );
};
export default FireFlower;
