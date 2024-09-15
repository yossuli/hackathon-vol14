import { FireList } from 'features/fires/FireList';
import { RoomList } from 'features/rooms/RoomList';
import { Layout } from 'layouts/Layout';
import Link from 'next/link';
import styles from './index.module.css';

const YourComponent = () => {
  return (
    <Layout
      render={(user) => (
        <div className={styles.container}>
          <div className={styles.title}>Hello {user.signInName}!</div>
          <RoomList />
          <FireList />
          {/* 花火玉作成ページへのリンクにスタイルを適用 */}
          <Link href="/hanabi_watch" className={styles.link}>
            花火鑑賞ページへ移動
          </Link>
        </div>
      )}
    />
  );
};

export default YourComponent;
