/* eslint-disable max-lines */
/* eslint-disable complexity, max-depth */

import Link from 'next/link';
import React, { useState } from 'react';
import { colors } from 'utils/colors/colors';
import { darkenColor } from 'utils/colors/colorUtils';
import { layer1, layer2, layer3, layer4 } from 'utils/layer';
import styles from './hanabi_creator.module.css'; // CSSファイルをインポート

const gridSize = 7; // グリッドサイズを7x7に設定

const FireworkShell: React.FC = () => {
  const [cellColors, setCellColors] = useState<Array<Array<string>>>(
    Array.from({ length: gridSize }, () => Array(gridSize).fill('')),
  );
  const [selectedColor, setSelectedColor] = useState<string>(''); // デフォルトの色
  const [draggingColor, setDraggingColor] = useState<string | null>(null); // ドラッグ中の色
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false); // マウスの押下状態
  const [showNameDialog, setShowNameDialog] = useState<boolean>(true); // 名前ダイアログの表示状態
  const [fireworkName, setFireworkName] = useState<string>(''); // 花火玉の名前
  const [isVisible, setIsVisible] = useState(false);

  // レイヤーの座標を定義
  const layerCoordinates = { layer1, layer2, layer3, layer4 };

  // セルの色を設定
  const setColorAtCoordinates = (
    coordinates: Array<{ row: number; col: number }>,
    color: string,
  ) => {
    const newCellColors = [...cellColors];
    coordinates.forEach(({ row, col }) => {
      newCellColors[row] = [...newCellColors[row]];
      newCellColors[row][col] = color;
    });
    setCellColors(newCellColors);
  };

  const handleCellMouseMove = (row: number, col: number) => {
    // eslint-disable-next-line complexity
    /* eslint-disable complexity, max-depth */
    if (isMouseDown && draggingColor) {
      let layerToFill: 'layer1' | 'layer2' | 'layer3' | 'layer4' | null = null;

      for (const [layer, coordinates] of Object.entries(layerCoordinates)) {
        // eslint-disable-next-line complexity
        if (coordinates.some((coord) => coord.row === row && coord.col === col)) {
          layerToFill = layer as 'layer1' | 'layer2' | 'layer3' | 'layer4';
          break;
        }
      }

      if (layerToFill) {
        // eslint-disable-next-line complexity
        setColorAtCoordinates(layerCoordinates[layerToFill], draggingColor);
      }
    }
  };

  const handleCellClick = (row: number, col: number) => {
    const newCellColors = [...cellColors];
    newCellColors[row] = [...newCellColors[row]];

    // セルの色を選択された色に設定
    newCellColors[row][col] = selectedColor;
    setCellColors(newCellColors);
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setDraggingColor(null);
  };

  const handleCellDrop = (row: number, col: number) => {
    if (draggingColor) {
      let layerToFill: 'layer1' | 'layer2' | 'layer3' | 'layer4' | null = null;
      for (const [layer, coordinates] of Object.entries(layerCoordinates)) {
        if (coordinates.some((coord) => coord.row === row && coord.col === col)) {
          layerToFill = layer as 'layer1' | 'layer2' | 'layer3' | 'layer4';

          break;
        }
      }
      if (layerToFill) {
        setColorAtCoordinates(layerCoordinates[layerToFill], draggingColor);
      }
    }
  };

  const handleColorPick = (color: string) => {
    setSelectedColor(color);
    setDraggingColor(color);
  };

  const resetColors = () => {
    setCellColors(Array.from({ length: gridSize }, () => Array(gridSize).fill('')));
    setDraggingColor(null);
  };

  const clearCellColor = () => {
    setSelectedColor('');
  };

  const handleNameSubmit = () => {
    if (fireworkName.trim()) {
      setShowNameDialog(false); // ダイアログを閉じる
    }
  };

  const renderCell = (row: number, col: number) => {
    // ドラッグ中かつホバー中かどうかを判定
    return (
      <div
        key={`${row}-${col}`}
        className={`${styles.gridCell}  draggable`}
        data-row={row}
        data-col={col}
        style={{ backgroundColor: cellColors[row][col] }}
        onClick={() => handleCellClick(row, col)}
        onMouseMove={() => handleCellMouseMove(row, col)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleCellDrop(row, col)}
      />
    );
  };

  return (
    <div className={styles.container}>
      {showNameDialog && (
        <div className={styles.nameDialog}>
          <h2>花火玉の名前を決めてください</h2>
          <input
            type="text"
            value={fireworkName}
            onChange={(e) => setFireworkName(e.target.value)}
            placeholder="花火玉の名前"
          />
          <button
            onClick={() => {
              handleNameSubmit(), setIsVisible(true);
            }}
          >
            決定
          </button>
        </div>
      )}
      <div
        className={styles.fireworkContainer}
        style={{ opacity: isVisible ? 1 : 0.5, pointerEvents: isVisible ? 'auto' : 'none' }}
      >
        <div className={styles.colorPickerModal}>
          {colors.map((color) => (
            <button
              key={color}
              draggable
              onDragStart={() => handleColorPick(color)}
              onDragEnd={handleMouseUp}
              className={styles.colorButton}
              style={{ backgroundColor: color }}
              onClick={() => handleColorPick(color)}
            />
          ))}
        </div>
        <div className={styles.colorPickerContainer}>
          {/* 花火玉の名前を表示 */}
          {!showNameDialog && (
            <div className={styles.fireworkNameDisplay}>
              <h2>花火玉の名前: {fireworkName}</h2>
            </div>
          )}
          <div className={styles.buttonContainer}>
            <button
              className={styles.colorPickerButton}
              style={{
                backgroundColor: selectedColor,
                boxShadow: `-4px 0 ${darkenColor(selectedColor, 20)}, 4px 0 ${darkenColor(selectedColor, 20)}, 0 4px ${darkenColor(selectedColor, 20)}, 0 -4px ${darkenColor(selectedColor, 20)}`,
              }}
            >
              色を選択: {selectedColor || '未選択'}
            </button>{' '}
            <button
              onClick={clearCellColor}
              className={styles.extractButton}
              style={{
                backgroundColor: selectedColor,
                boxShadow: `-4px 0 ${darkenColor(selectedColor, 20)}, 4px 0 ${darkenColor(selectedColor, 20)}, 0 4px ${darkenColor(selectedColor, 20)}, 0 -4px ${darkenColor(selectedColor, 20)}`,
              }}
            >
              抜き取る
            </button>
            <button
              onClick={resetColors}
              className={styles.resetButton}
              style={{
                backgroundColor: selectedColor,
                boxShadow: `-4px 0 ${darkenColor(selectedColor, 20)}, 4px 0 ${darkenColor(selectedColor, 20)}, 0 4px ${darkenColor(selectedColor, 20)}, 0 -4px ${darkenColor(selectedColor, 20)}`,
              }}
            >
              リセット
            </button>
          </div>
          <div className={styles.gridContainer}>
            {[...Array(gridSize)].map((_, row) =>
              [...Array(gridSize)].map((_, col) => renderCell(row, col)),
            )}
          </div>
        </div>

        <div className={styles.saveundoContainer}>
          <div className={styles.save}>
            <Link href="/" legacyBehavior>
              <a className={styles.buttonText}>保存する</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className={styles.buttonText}>戻る</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireworkShell;
