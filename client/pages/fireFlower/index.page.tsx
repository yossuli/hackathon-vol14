import React, { useState } from 'react';
import styles from './index.module.css';

interface Pixel {
  r: number;
  g: number;
  b: number;
}

const FireFlower = () => {
  const PIXEL_SIZE = 10;

  const [fireFlower, setFireFlower] = useState<Pixel[][]>([]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const input = JSON.parse(event.target.value);
      setFireFlower(input);
    } catch (error) {
      console.error('入力が無効です: 正しいJSON形式で入力してください。');
    }
  };

  const template = (fireFlower: Pixel[][]) => {
    return fireFlower
      .map((row, y) =>
        row.map(
          (pixel, x) =>
            `${x * PIXEL_SIZE}px ${y * PIXEL_SIZE}px 0 rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`,
        ),
      )
      .flat()
      .join(', ');
  };

  return (
    <div className={styles.firFlower}>
      <textarea
        placeholder="ここにピクセルデータのJSONを入力してください"
        onChange={handleInput}
        rows={10}
        cols={50}
      ></textarea>

      <div
        className={styles.pixelArt}
        style={{
          width: `${fireFlower[0]?.length * PIXEL_SIZE}px`,
          height: `${fireFlower.length * PIXEL_SIZE}px`,
          boxShadow: template(fireFlower),
        }}
      ></div>
    </div>
  );
};

export default FireFlower;
