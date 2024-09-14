import { useState } from 'react';
import styles from './firelist.module.css'; // 指定されたCSSファイルを使用

type Firework = {
  id: number;
  name: string;
  owner: string;
  color: string;
  createdAt: string;
};

export const FireList = () => {
  // 花火のリストをモックデータで管理
  const [fireworks, setFireworks] = useState<Firework[]>([
    { id: 1, name: 'Sparkler', owner: 'User1', color: 'Red', createdAt: '2024-01-01' },
    { id: 2, name: 'Roman Candle', owner: 'User2', color: 'Blue', createdAt: '2024-01-02' },
    { id: 3, name: 'Fountain', owner: 'User3', color: 'Green', createdAt: '2024-01-03' },
  ]);

  // 花火の履歴をモックデータで管理
  const [history, setHistory] = useState<string[]>([
    'User1 created Sparkler on 2024-01-01',
    'User2 created Roman Candle on 2024-01-02',
  ]);

  // 新しい花火を追加する関数（仮）
  const createFirework = () => {
    const newFirework: Firework = {
      id: fireworks.length + 1,
      name: 'New Firework',
      owner: 'User4',
      color: 'Yellow',
      createdAt: new Date().toISOString(),
    };
    setFireworks([...fireworks, newFirework]);
    setHistory([
      ...history,
      `${newFirework.owner} created ${newFirework.name} on ${newFirework.createdAt}`,
    ]);
  };

  // 花火を削除する関数（仮）
  const deleteFirework = (id: number) => {
    setFireworks(fireworks.filter((firework) => firework.id !== id));
    setHistory([...history, `Firework with id ${id} was deleted.`]);
  };

  // 花火のランダム割り当て関数（仮）
  const assignRandomFirework = () => {
    const randomFirework = {
      id: Math.floor(Math.random() * 1000),
      name: 'Random Firework',
      owner: `RandomUser${Math.floor(Math.random() * 100)}`,
      color: 'RandomColor',
      createdAt: new Date().toISOString(),
    };
    setFireworks([...fireworks, randomFirework]);
    setHistory([...history, `${randomFirework.owner} received a random firework.`]);
  };

  // 花火のリスト表示
  return (
    <div className={styles.main}>
      <h1>Firework List</h1>
      <div className={styles.controls}>
        <button className={styles.btn} onClick={createFirework}>
          Create Firework
        </button>
        <button className={styles.btn} onClick={assignRandomFirework}>
          Assign Random Firework
        </button>
      </div>

      <h2>Your Fireworks</h2>
      <ul>
        {fireworks.map((firework) => (
          <li key={firework.id} className={styles.card}>
            <div className={styles.form}>
              <span>Name: {firework.name}</span> <br />
              <span>Owner: {firework.owner}</span> <br />
              <span>Color: {firework.color}</span> <br />
              <span>Created At: {firework.createdAt}</span> <br />
              <div className={styles.controls}>
                <button className={styles.btn} onClick={() => deleteFirework(firework.id)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <h2>Firework History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};
