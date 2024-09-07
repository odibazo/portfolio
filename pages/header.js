// components/Header.js

import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Odi Bazó</h1>
      <nav className={styles.buttons}>
        <Link href="/ui-graphic-design">
          <span className={styles.button}>UI Graphic Design</span>
        </Link>
        <Link href="/video">
          <span className={styles.button}>Video</span>
        </Link>
        <Link href="/about">
          <span className={styles.button}>About</span>
        </Link>
      </nav>
    </header>
  );
}
