import { Layout } from 'layouts/Layout';
import Header from '../components/header/Header';
import styles from './index.module.css';

const Home = () => {
  return (
    <Layout
      render={() => (
        <div>
          <Header />
          <div className={styles.logo}>
            <img src="/images/logo_navy.png" alt="Logo" className={styles.logoImage} />
          </div>
          <div className={styles.container}>
            <a href="/hanabi_creator/" className={styles.button}>
              花火を作成する
            </a>
            <a href="/rooms/hanabi_select/" className={styles.button}>
              ランダムに入室
            </a>
            <div className={styles.options}>
              <a href="/rooms/private/restriction" className={styles.optionButton}>
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
