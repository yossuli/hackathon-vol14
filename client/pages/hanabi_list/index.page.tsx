import { colors } from 'utils/colors/colors';
import Header from '../../components/header/Header';
import styles from './index.module.css';

const works = () => {
  const dummyData = {
    flower1: {
      flower: [
        [0, 1, 2, 3, 4, 5, 6],
        [23, 24, 25, 26, 27, 6, 7],
        [22, 38, 39, 40, 41, 28, 8],
        [21, 37, 46, 47, 42, 29, 9],
        [20, 36, 45, 44, 43, 30, 10],
        [19, 35, 34, 33, 32, 31, 11],
        [18, 17, 16, 15, 14, 13, 12],
      ],
      name: 'Fire Flower',
    },
    flower2: {
      flower: [
        [60, 60, 60, 60, 60, 60, 60],
        [60, 0, 0, 0, 0, 0, 60],
        [60, 0, 25, 25, 25, 0, 60],
        [60, 0, 25, 20, 25, 0, 60],
        [60, 0, 25, 25, 25, 0, 60],
        [60, 0, 0, 0, 0, 0, 60],
        [60, 60, 60, 60, 60, 60, 60],
      ],
      name: 'Fire Flower2',
    },
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.h1}>一覧</h1>
        <div className={styles.summary}>
          {Object.entries(dummyData).map(([key, data]) => (
            <div key={key} className={styles.flowerBlock}>
              <div className={styles.fireFlower}>
                <div className={styles.background}>
                  {data.flower.map((row, i) => (
                    <div key={i} className={styles.pixel}>
                      {row.map((col, j) => (
                        <div
                          key={j}
                          className={styles.cell}
                          style={{
                            backgroundColor: col === 0 ? 'white' : colors[col - 1],
                          }}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>

                <h2 className={styles.flowerName}>{data.name}</h2>
                <div className={styles.buttonContainer}>
                  <button className={styles.editButton}>編集</button>
                  <button className={styles.deleteButton}>消去</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default works;
