import React, { useState } from 'react';
import styles from './hanabi_creator.module.css'; // CSSファイルをインポート

const gridSize = 7; // グリッドサイズを7x7に設定

const FireworkShell: React.FC = () => {
  const [cellColors, setCellColors] = useState<Array<Array<string>>>(
    Array.from({ length: gridSize }, () => Array(gridSize).fill('')),
  );

  const [selectedColor, setSelectedColor] = useState<string>(''); // デフォルトの色
  const [draggingColor, setDraggingColor] = useState<string | null>(null); // ドラッグ中の色
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [selectedLayer, setSelectedLayer] = useState<
    'layer1' | 'layer2' | 'layer3' | 'layer4' | null
  >(null);

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

  const handleCellClick = (row: number, col: number, color: string) => {
    const newCellColors = [...cellColors];
    newCellColors[row] = [...newCellColors[row]];
    newCellColors[row][col] = color;
    setCellColors(newCellColors);
  };

  const handleCellMouseMove = (row: number, col: number) => {
    if (draggingColor) {
      handleCellClick(row, col, draggingColor);
    }
  };

  const handleCellDrop = (row: number, col: number) => {
    if (draggingColor) {
      handleCellClick(row, col, draggingColor);
    }
  };

  const extractColor = () => {
    setSelectedColor('');
    setDraggingColor(null);
  };

  const resetColors = () => {
    setCellColors(Array.from({ length: gridSize }, () => Array(gridSize).fill('')));
    setDraggingColor(null);
  };

  const handleLayerButtonClick = (layer: 'layer1' | 'layer2' | 'layer3' | 'layer4') => {
    setSelectedLayer(layer);
    setShowColorPicker(true);
  };

  const handleColorPick = (color: string) => {
    setSelectedColor(color);
    if (selectedLayer) {
      setColorAtCoordinates(layerCoordinates[selectedLayer], color);
    }
  };

  const handleColorDragStart = (color: string) => {
    setDraggingColor(color);
  };

  const handleColorDragEnd = () => {
    setDraggingColor(null);
  };

  const handleCloseModal = () => {
    setShowColorPicker(false);
    setSelectedLayer(null);
  };

  const renderCell = (row: number, col: number) => (
    <div
      key={`${row}-${col}`}
      className={`${styles.gridCell} draggable`}
      data-row={row}
      data-col={col}
      style={{ backgroundColor: cellColors[row][col] }}
      onMouseMove={() => handleCellMouseMove(row, col)}
      onClick={() => handleCellClick(row, col, selectedColor)}
      onDragOver={(e) => e.preventDefault()} // ドロップを許可
      onDrop={() => handleCellDrop(row, col)} // ドロップ時の処理
    />
  );

  const renderLayerButton = (layer: 'layer1' | 'layer2' | 'layer3' | 'layer4', label: string) => (
    <button
      onClick={() => handleLayerButtonClick(layer)}
      className={`${styles.controlButton} ${selectedLayer === layer ? styles.activeButton : ''}`}
    >
      {selectedLayer === layer ? '選択中' : label}
    </button>
  );

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        {renderLayerButton('layer1', '外側')}
        {renderLayerButton('layer2', '中外側')}
        {renderLayerButton('layer3', '内側')}
        {renderLayerButton('layer4', '中心')}

        {showColorPicker && (
          <div className={styles.modalOverlay}>
            <div className={styles.colorPickerModal}>
              <button onClick={handleCloseModal} className={styles.closeButton}>
                ✕
              </button>
              {[
                'red',
                'yellow',
                'green',
                'blue',
                'orange',
                'purple',
                'pink',
                'brown',
                'cyan',
                'magenta',
                'lime',
                'gray',
                'teal',
                'indigo',
                'violet',
                'gold',
                'silver',
                'maroon',
                'navy',
                'olive',
              ].map((color) => (
                <button
                  key={color}
                  draggable
                  onDragStart={() => handleColorDragStart(color)}
                  onDragEnd={handleColorDragEnd}
                  onClick={() => {
                    handleColorPick(color);
                    setSelectedLayer(null);
                  }}
                  className={styles.colorButton}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.fireworkContainer}>
        <div className={styles.colorPickerContainer}>
          <button
            onClick={() => {
              setSelectedLayer(null);
              setShowColorPicker(true);
            }}
            className={styles.colorPickerButton}
          >
            色を選択
          </button>
          <button
            onClick={() => {
              setSelectedLayer(null);
              extractColor();
            }}
            className={styles.extractButton}
          >
            色を抜き取る
          </button>
          <button
            onClick={() => {
              setSelectedLayer(null);
              resetColors();
            }}
            className={styles.resetButton}
          >
            リセット
          </button>

          <div className={styles.gridContainer}>
            {[...Array(gridSize)].map((_, row) =>
              [...Array(gridSize)].map((_, col) => renderCell(row, col)),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireworkShell;
