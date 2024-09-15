import React from 'react';
import styles from './header.module.css'; // スタイルシートのインポート

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/images/logo_white.png" alt="Logo" className={styles.logoImage} />
        <h1></h1>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="/"></a>
          </li>
          <li>
            <a href="/about"></a>
          </li>
          <li>
            <a href="/works"></a>
          </li>
          <li>
            <a href="/contact">INIAD.ts</a>
          </li>
        </ul>
      </nav>
      {children} {/* 子要素をレンダリング */}
    </header>
  );
};

export default Header;
