import { useRouter } from 'next/router';
import React from 'react';
import styles from './header.module.css';

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => router.push('/')}>
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
            <a href="https://github.com/yossuli/hackathon-vol14" target="_blank" rel="noreferrer noopener">INIAD.ts</a>
          </li>
        </ul>
      </nav>
      {children}
    </header>
  );
};

export default Header;
