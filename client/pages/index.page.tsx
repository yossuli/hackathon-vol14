import { Layout } from 'layouts/Layout';
import Header from '../components/header/Header';
import FireFlower from './fireFlower/index.page';
import styles from './index.module.css';

const Home = () => {
  return (
    <Layout
      render={() => (
        <div>
          <Header />
          <FireFlower
            shape={[
              [1, 1, 1, 1, 1, 1, 1],
              [1, 3, 3, 3, 3, 3, 1],
              [1, 3, 4, 4, 4, 3, 1],
              [1, 3, 4, 2, 4, 3, 1],
              [1, 3, 4, 4, 4, 3, 1],
              [1, 3, 3, 3, 3, 3, 1],
              [1, 1, 1, 1, 1, 1, 1],
            ]}
          />
          <div className={styles.logo}>
            <img src="/images/logo_navy.png" alt="Logo" className={styles.logoImage} />
          </div>
          <div className={styles.container}>
            <a href="/hanabi_creator/" className={styles.button}>
              花火を作成する
            </a>
            <a href="/rooms/hanabi_watch/" className={styles.button}>
              ランダムに入室
            </a>
            <div className={styles.options}>
              <a href="/rooms/private/" className={styles.optionButton}>
                プライベートルーム
              </a>
              <a href="/hanabi_list/" className={styles.optionButton}>
                作品
              </a>
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default Home;
