import { TaskList } from 'features/tasks/TaskList';
import { Layout } from 'layouts/Layout';
import Link from 'next/link';
import styles from './index.module.css';

const Home = () => {
  return (
    <Layout
      render={(user) => (
        <div className={styles.container}>
          <div className={styles.title}>Hello {user.signInName}!</div>
          <TaskList />
          {/* 花火玉作成ページへのリンクにスタイルを適用 */}
          <Link href="/hanabi_creator" className={styles.link}>
            花火玉作成ページへ移動
          </Link>
        </div>
      )}
    />
  );
};

export default Home;
