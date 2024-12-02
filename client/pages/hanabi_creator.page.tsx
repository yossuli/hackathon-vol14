/* eslint-disable max-lines */
/* eslint-disable complexity, max-depth */

import Link from 'next/link';
import React, { useState } from 'react';
import { darkenColor } from 'utils/colors/colorUtils';
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
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null); // ホバー中のセル

  // レイヤーの座標を定義
  const layerCoordinates = {
    layer1: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 0, col: 4 },
      { row: 0, col: 5 },
      { row: 0, col: 6 },
      { row: 1, col: 0 },
      { row: 1, col: 6 },
      { row: 2, col: 0 },
      { row: 2, col: 6 },
      { row: 3, col: 0 },
      { row: 3, col: 6 },
      { row: 4, col: 0 },
      { row: 4, col: 6 },
      { row: 5, col: 0 },
      { row: 5, col: 6 },
      { row: 6, col: 0 },
      { row: 6, col: 1 },
      { row: 6, col: 2 },
      { row: 6, col: 3 },
      { row: 6, col: 4 },
      { row: 6, col: 5 },
      { row: 6, col: 6 },
    ],
    layer2: [
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 3 },
      { row: 1, col: 4 },
      { row: 1, col: 5 },
      { row: 2, col: 1 },
      { row: 2, col: 5 },
      { row: 3, col: 1 },
      { row: 3, col: 5 },
      { row: 4, col: 1 },
      { row: 4, col: 5 },
      { row: 5, col: 1 },
      { row: 5, col: 2 },
      { row: 5, col: 3 },
      { row: 5, col: 4 },
      { row: 5, col: 5 },
    ],
    layer3: [
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 2, col: 4 },
      { row: 3, col: 2 },
      { row: 3, col: 4 },
      { row: 4, col: 2 },
      { row: 4, col: 3 },
      { row: 4, col: 4 },
    ],
    layer4: [{ row: 3, col: 3 }],
  };

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
    setHoveredCell({ row, col }); // ホバーしているセルの座標を更新
  };

  const handleMouseLeave = () => {
    setHoveredCell(null); // ホバーが外れたら状態をリセット
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
    const isHovered = isMouseDown && hoveredCell?.row === row && hoveredCell?.col === col;
    return (
      <div
        key={`${row}-${col}`}
        className={`${styles.gridCell} ${isHovered ? styles.hovered : ''} draggable`}
        data-row={row}
        data-col={col}
        style={{ backgroundColor: cellColors[row][col] }}
        onClick={() => handleCellClick(row, col)}
        onMouseMove={() => handleCellMouseMove(row, col)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
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
          <button onClick={handleNameSubmit}>決定</button>
        </div>
      )}
      <div className={styles.fireworkContainer}>
        <div className={styles.colorPickerModal}>
          {[
            '#FF4500',
            '#FF6347',
            '#FF7F50',
            '#FF8C00',
            '#FFA500',
            '#FFD700',
            '#FFFF00',
            '#FFFACD',
            '#FAFAD2',
            '#FFEFD5',
            '#FFE4B5',
            '#FFDAB9',
            '#EEE8AA',
            '#F0E68C',
            '#BDB76B',
            '#ADFF2F',
            '#7FFF00',
            '#7CFC00',
            '#00FF00',
            '#32CD32',
            '#98FB98',
            '#90EE90',
            '#00FA9A',
            '#00FF7F',
            '#3CB371',
            '#2E8B57',
            '#228B22',
            '#008000',
            '#006400',
            '#66CDAA',
            '#8FBC8F',
            '#20B2AA',
            '#48D1CC',
            '#40E0D0',
            '#00CED1',
            '#00BFFF',
            '#1E90FF',
            '#6495ED',
            '#4682B4',
            '#4169E1',
            '#0000FF',
            '#0000CD',
            '#8A2BE2',
            '#4B0082',
            '#6A5ACD',
            '#7B68EE',
            '#9370DB',
            '#8B008B',
            '#9932CC',
            '#9400D3',
            '#BA55D3',
            '#DDA0DD',
            '#EE82EE',
            '#FF00FF',
            '#FF1493',
            '#FF69B4',
            '#FFB6C1',
            '#FFC0CB',
            '#FF6347',
            '#FF4500',
            '#FF7F50',
            '#FF8C00',
            '#FFA07A',
            '#FFD700',
            '#FFFF00',
            '#DAA520',
            '#B8860B',
            '#CD5C5C',
            '#DC143C',
            '#B22222',
            '#8B0000',
            '#A52A2A',
            '#D2691E',
            '#FF8C00',
            '#FF6347',
          ].map((color) => (
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
