import React, { useState } from 'react';
import styles from './hanabi_creator.module.css'; // CSSファイルをインポート

const gridSize = 7; // グリッドサイズを7x7に変更

const FireworkShell: React.FC = () => {
  const [cellColors, setCellColors] = useState<Array<Array<string>>>(
    Array.from({ length: gridSize }, () => Array(gridSize).fill('')),
  );

  const [selectedColor, setSelectedColor] = useState<string>('blue'); // デフォルトの色
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
    layer4: [{ row: 3, col: 3 }], // 中心の1つのセル
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

  const handleCellClick = (row: number, col: number) => {
    const newCellColors = [...cellColors];
    newCellColors[row] = [...newCellColors[row]];
    newCellColors[row][col] = selectedColor; // 選択された色を適用
    setCellColors(newCellColors);
  };

  const extractColor = () => setSelectedColor(''); // 色を抜き取る（セルの色をリセット）

  const resetColors = () =>
    setCellColors(Array.from({ length: gridSize }, () => Array(gridSize).fill('')));

  const handleLayerButtonClick = (layer: 'layer1' | 'layer2' | 'layer3' | 'layer4') => {
    setSelectedLayer(layer);
    setShowColorPicker(true); // モーダルを開く
  };

  const handleColorPick = (color: string) => {
    setSelectedColor(color); // 色を選択
    if (selectedLayer) {
      setColorAtCoordinates(layerCoordinates[selectedLayer], color);
    }
  };

  const handleCloseModal = () => {
    setShowColorPicker(false);
    setSelectedLayer(null);
  };

  const renderCell = (row: number, col: number) => (
    <div
      key={`${row}-${col}`}
      className={styles.gridCell}
      style={{ backgroundColor: cellColors[row][col] }}
      onClick={() => handleCellClick(row, col)}
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
  console.log(selectedLayer);
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        {renderLayerButton('layer1', '外側')}
        {renderLayerButton('layer2', '中外側')}
        {renderLayerButton('layer3', '内側')}
        {renderLayerButton('layer4', '中心')}

        {/* カラーピッカーのモーダル */}
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
              ].map((color) => (
                <button
                  key={color}
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
              setSelectedLayer(null); // レイヤーをリセット
              extractColor(); // 色を抜き取る処理を実行
            }}
            className={styles.extractButton}
          >
            色を抜き取る
          </button>
          <button
            onClick={() => {
              setSelectedLayer(null); // レイヤーをリセット
              resetColors(); // 色を抜き取る処理を実行
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
