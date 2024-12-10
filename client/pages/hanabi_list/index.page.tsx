import Header from '../../components/header/Header';
import styles from './index.module.css';

const works = () => {
  const dummyData = {
    flower1: {
      flower: [
        [1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1],
      ],
      name: 'Fire Flower',
    },
    flower2: {
      flower: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 2, 0, 0, 0],
        [0, 1, 0, 2, 0, 0, 0],
        [0, 1, 0, 2, 0, 0, 0],
        [0, 1, 0, 2, 0, 0, 0],
        [0, 1, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
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
              <h2 className={styles.flowerName}>{data.name}</h2>
              <div className={styles.buttonContainer}>
                <button className={styles.editButton}>編集</button>
                <button className={styles.deleteButton}>消去</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default works;
