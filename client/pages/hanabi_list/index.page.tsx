import type { FireFlowerDto } from 'common/types/fireFlower';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import Header from '../../components/header/Header';
import styles from './index.module.css';

const works = () => {
  const [fireFlowerData, setFireFlowerData] = useState<FireFlowerDto[]>([]);
  const router = useRouter();
  useEffect(() => {
    fetchFireFlowerData();
  }, []);

  const fetchFireFlowerData = async () => {
    try {
      const res = await apiClient.private.fireFlowers.$get();
      setFireFlowerData(res);
      console.log(res);
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
    }
  };

  const handleEdit = (id: string) => {
    try {
      router.push(`../hanabi_creator/?id=${id}`);
    } catch (error) {
      console.error('Error fetching firework ID:', error);
      alert('IDの取得に失敗しました。');
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.h1}>一覧</h1>
        <div className={styles.summary}>
          {Object.entries(fireFlowerData).map(([key, data]) => (
            <div key={key} className={styles.flowerBlock}>
              <div className={styles.fireFlower}>
                <div className={styles.background}>
                  {data.structure.map((row, i) => (
                    <div key={i} className={styles.pixel}>
                      {row.map((col, j) => (
                        <div
                          key={j}
                          className={styles.cell}
                          style={{
                            backgroundColor: col ?? 'transparent',
                          }}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>

                <h2 className={styles.flowerName}>{data.name}</h2>
                <div className={styles.buttonContainer}>
                  <button className={styles.editButton} onClick={() => handleEdit(data.id)}>
                    編集
                  </button>
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
