/* eslint-disable max-lines */
/* eslint-disable complexity, max-depth */
import { usePreventDefault } from 'hooks/usePreventDefault';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import { colors } from 'utils/colors/colors';
import { darkenColor } from 'utils/colors/colorUtils';
import { layer1, layer2, layer3, layer4 } from 'utils/layer';
import Header from '../../components/header/Header';
import styles from './index.module.css';

const gridSize = 7;

const FireworkShell: React.FC = () => {
  const [cellColors, setCellColors] = useState<Array<Array<string>>>(
    Array.from({ length: gridSize }, () => Array(gridSize).fill('')),
  );
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [draggingColor, setDraggingColor] = useState<string | null>(null);
  const [showNameDialog, setShowNameDialog] = useState<boolean>(true);
  const [fireworkName, setFireworkName] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [touchStartPosition, setTouchStartPosition] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [hoveredCells, setHoveredCells] = useState<Array<{ row: number; col: number }>>([]);
  const [fireworkId, setFireworkId] = useState<string | null>(null);

  const layerCoordinates = { layer1, layer2, layer3, layer4 };
  let layerToFill: 'layer1' | 'layer2' | 'layer3' | 'layer4' | null = null;
  const router = useRouter();
  const { id } = router.query;

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
    newCellColors[row][col] = selectedColor;
    setCellColors(newCellColors);
  };

  const handleMouseUp = () => {
    setDraggingColor(null);
    setHoveredCells([]);
  };

  const handleCellDrop = (row: number, col: number) => {
    if (draggingColor) {
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
    if (!fireworkName.trim()) {
      alert('花火玉の名前を入力してください。');
      return;
    }
    setShowNameDialog(false);
  };

  const renderCell = (row: number, col: number) => {
    const isHovered = hoveredCells.some((cell) => cell.row === row && cell.col === col);
    const hoverCellStyle = {
      backgroundColor: isHovered ? darkenColor(selectedColor, 60) : '',
    };

    return (
      <div
        key={`${row}-${col}`}
        className={`${styles.gridCell} draggable `}
        data-row={row}
        data-col={col}
        style={{
          ...hoverCellStyle,
          backgroundColor: cellColors[row][col] || hoverCellStyle.backgroundColor,
        }}
        onClick={() => handleCellClick(row, col)}
        onMouseUp={handleMouseUp}
        onDragOver={(e) => {
          e.preventDefault();
          if (draggingColor) {
            for (const [layer, coordinates] of Object.entries(layerCoordinates)) {
              if (coordinates.some((coord) => coord.row === row && coord.col === col)) {
                layerToFill = layer as 'layer1' | 'layer2' | 'layer3' | 'layer4';
                setHoveredCells(coordinates);
              }
            }
          }
        }}
        onDragLeave={() => {
          setHoveredCells([]);
        }}
        onDrop={() => {
          handleCellDrop(row, col);
        }}
        onMouseEnter={() => setHoveredCells([{ row, col }])}
        onMouseLeave={() => setHoveredCells([])}
      />
    );
  };

  const handleNameSave = async () => {
    try {
      const res = await apiClient.private.fireFlowers.post({
        body: {
          name: fireworkName,
        },
      });
      console.log('API Response:', res);
      setShowNameDialog(false);
      setIsVisible(true);
      setFireworkId(res.body.id);
    } catch (error) {
      console.error('Error saving firework:', error);
      if (error instanceof Error) {
        alert('An error occurred while saving');
      } else {
        alert('An unknown error occurred while saving.');
      }
    }
  };

  const handleStructureSave = async () => {
    if (!fireworkId) {
      alert('花火玉のIDが見つかりません。');
      return;
    }

    try {
      await handleNameSave();
      const res2 = await apiClient.private.fireFlowers._fireId(fireworkId).patch({
        body: { structure: cellColors },
      });
      console.log('API Response:', res2);
      router.push('/');
    } catch (error) {
      console.error('Error saving firework structure:', error);
      if (error instanceof Error) {
        alert('An error occurred while saving structure');
      } else {
        alert('An unknown error occurred while saving structure.');
      }
    }
  };

  useEffect(() => {
    if (id) {
      editFireFlower();
    }
  }, [id]);

  const editFireFlower = async () => {
    try {
      const data = await apiClient.private.fireFlowers._fireId(id as string).$get();
      setFireworkName(data.name);
      setCellColors(data.structure.map((row: (string | null)[]) => row.map((col) => col ?? '')));
      setFireworkId(data.id);
      setShowNameDialog(false);
      setIsVisible(true);
    } catch (error) {
      console.error('花火データの取得中にエラーが発生しました:', error);
      alert('データの取得に失敗しました。');
    }
  };
  console.log(fireworkName);
  return (
    <div>
      <Header />
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
                handleNameSubmit(), setIsVisible(true), handleNameSave();
              }}
              disabled={!fireworkName.trim()}
            >
              決定
            </button>
          </div>
        )}
        <div
          className={styles.fireworkContainer}
          style={{
            opacity: isVisible ? 1 : 0.5,
            pointerEvents: isVisible ? 'auto' : 'none',
          }}
        >
          <div className={styles.colorPickerContainer}>
            {!showNameDialog && (
              <div className={styles.fireworkNameDisplay}>
                花火玉の名前:
                <input
                  type="text"
                  value={fireworkName}
                  onChange={(e) => setFireworkName(e.target.value)}
                  placeholder="花火玉の名前"
                  className={styles.inputDisplay}
                />
              </div>
            )}
            <div className={styles.gridContainer}>
              {[...Array(gridSize)].map((_, row) =>
                [...Array(gridSize)].map((_, col) => renderCell(row, col)),
              )}
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={styles.colorPickerButton}
                style={{
                  boxShadow: `-4px 0 ${darkenColor(selectedColor, 20)}, 4px 0 ${darkenColor(
                    selectedColor,
                    20,
                  )}, 0 4px ${darkenColor(selectedColor, 20)}, 0 -4px ${darkenColor(selectedColor, 20)}`,
                }}
              >
                色を選択:
                <br />
                <span style={{ color: selectedColor }}>{selectedColor || '未選択'}</span>
              </button>
              <button
                onClick={clearCellColor}
                className={styles.extractButton}
                style={{
                  boxShadow: `-4px 0 ${darkenColor(selectedColor, 20)}, 4px 0 ${darkenColor(
                    selectedColor,
                    20,
                  )}, 0 4px ${darkenColor(selectedColor, 20)}, 0 -4px ${darkenColor(selectedColor, 20)}`,
                }}
              >
                抜き取る
              </button>
              <button
                onClick={resetColors}
                className={styles.resetButton}
                style={{
                  boxShadow: `-4px 0 ${darkenColor(selectedColor, 20)}, 4px 0 ${darkenColor(
                    selectedColor,
                    20,
                  )}, 0 4px ${darkenColor(selectedColor, 20)}, 0 -4px ${darkenColor(selectedColor, 20)}`,
                }}
              >
                リセット
              </button>
            </div>
            <div className={styles.colorPickerModal}>
              {colors.map((color, index) => {
                const buttonRef = usePreventDefault<HTMLButtonElement>();
                return (
                  <button
                    ref={buttonRef}
                    key={`${index}-${color}`}
                    draggable
                    onDragStart={() => handleColorPick(color)}
                    onDragEnd={handleMouseUp}
                    onTouchStart={(e) => {
                      const touch = e.touches[0];
                      setTouchStartPosition({ x: touch.clientX, y: touch.clientY });
                      handleColorPick(color);
                    }}
                    onTouchMove={() => {
                      if (!touchStartPosition) return;
                    }}
                    onTouchEnd={(e) => {
                      if (!touchStartPosition) return;
                      const touch = e.changedTouches[0];
                      const element = document.elementFromPoint(touch.clientX, touch.clientY);
                      if (element?.classList.contains(styles.gridCell)) {
                        const row = parseInt(element.getAttribute('data-row') || '0');
                        const col = parseInt(element.getAttribute('data-col') || '0');
                        handleCellDrop(row, col);
                      }
                      setTouchStartPosition(null);
                      handleMouseUp();
                    }}
                    className={styles.colorButton}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorPick(color)}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles.saveundoContainer}>
            <div className={styles.save}>
              <button className={styles.buttonText} onClick={handleStructureSave}>
                保存する
              </button>
              <Link href="/" legacyBehavior>
                <a className={styles.buttonText}>戻る</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireworkShell;
