import type { FireFlowerDto } from 'common/types/fireFlower';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import Header from '../../../components/header/Header';
import styles from './index.module.css';

const HanabiSelect: React.FC = () => {
  const [userFireworks, setUserFireworks] = useState<FireFlowerDto[]>([]);
  const [sampleFireworks, setSampleFireworks] = useState<FireFlowerDto[]>([]);
  const [selectedFireworks, setSelectedFireworks] = useState<FireFlowerDto[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchFireworks();
    fetchSampleFireworks();
  }, []);

  const fetchFireworks = async () => {
    try {
      const userFireworks = await apiClient.private.fireFlowers.own.$get();
      setUserFireworks(userFireworks);
      console.log(userFireworks);
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
    }
  };

  const fetchSampleFireworks = async () => {
    try {
      const res = await apiClient.private.fireFlowers.random.$get();
      const sampleFireworks = res.filter(
        (firework: FireFlowerDto) => firework.creator.signInName === 'sampleUser',
      );
      setSampleFireworks(sampleFireworks);
      console.log(sampleFireworks);
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
    }
  };

  const handleFireworkSelect = (firework: FireFlowerDto) => {
    if (selectedFireworks.includes(firework)) {
      setSelectedFireworks(selectedFireworks.filter((f) => f.id !== firework.id));
    } else if (selectedFireworks.length < 3) {
      setSelectedFireworks([...selectedFireworks, firework]);
    } else {
      alert('3つまで選択できます。');
    }
  };

  const handleNextRoom = async () => {
    try {
      const room = await apiClient.private.rooms.post({
        body: { name: 'testRoom', status: 'PUBLIC' },
      });

      const res = await apiClient.private.rooms._roomId(room.body.id).post({
        body: selectedFireworks.map(({ id }) => id),
      });

      if (res.status === 201) {
        router.push(`/rooms/hanabi_watch/`);
      }
    } catch (error) {
      try {
        const room = await apiClient.private.rooms.post({
          body: { name: 'testRoom', status: 'PUBLIC' },
        });

        await apiClient.private.rooms.delete();

        const res = await apiClient.private.rooms._roomId(room.body.id).post({
          body: selectedFireworks.map(({ id }) => id),
        });
        //eslint-disable-next-line
        if (res.status === 201) {
          router.push(`/rooms/hanabi_watch/`);
        }
      } catch (error) {
        console.error('次の部屋への移動中にエラーが発生しました:', error);
      }
    }
  };

  const renderFirework = (firework: FireFlowerDto) => (
    <div
      key={firework.id}
      className={`${styles.fireworkBlock} ${selectedFireworks.includes(firework) ? styles.selected : ''}`}
      onClick={() => handleFireworkSelect(firework)}
    >
      <div className={styles.fireworkName}>{firework.name}</div>
      <div className={styles.fireworkGrid}>
        {firework.structure.map((row, i) => (
          <div key={i} className={styles.fireworkRow}>
            {row.map((col, j) => (
              <div
                key={j}
                className={styles.fireworkCell}
                style={{ backgroundColor: col ?? 'transparent' }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.h1}>花火を選択</h1>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>ユーザーが作った花火</h2>
          <div className={styles.fireworkList}>{userFireworks.map(renderFirework)}</div>
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>サンプルの花火</h2>
          <div className={styles.fireworkList}>{sampleFireworks.map(renderFirework)}</div>
        </div>
        <button onClick={handleNextRoom} disabled={selectedFireworks.length !== 3}>
          次の部屋へ
        </button>
      </div>
    </div>
  );
};

export default HanabiSelect;
