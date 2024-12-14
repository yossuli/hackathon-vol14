import styles from './index.module.css';

function restrictionPage() {
  return (
    <div className={styles.restrictionContainer}>
      <p className={styles.restrictionText}>
        『スーパー花火大会 in 技育博』開催につき入場制限中{' '}
        <a href="/rooms/hanabi_select" className={styles.link}>
          スーパー花火大会の会場はこちら
        </a>
      </p>
    </div>
  );
}

export default restrictionPage;
