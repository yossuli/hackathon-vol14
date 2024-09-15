import { TaskList } from 'features/tasks/TaskList';
import { Layout } from 'layouts/Layout';
import styles from './index.module.css';

const YourComponent = () => {
  return (
    <Layout
      render={(user) => (
        <div className={styles.container}>
          <div className={styles.title}>Hello {user.signInName}!</div>
          <TaskList />
        </div>
      )}
    />
  );
};

export default YourComponent;
