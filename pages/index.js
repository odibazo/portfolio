// pages/index.js

import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Odi Bazó</h1>
      <div className={styles.buttons}>
        <Link href="/ui-graphic-design">
          <span className={styles.button}>UI Graphic Design</span>
        </Link>
        <Link href="/video">
          <span className={styles.button}>Video</span>
        </Link>
        <Link href="/about">
          <span className={styles.button}>About</span>
        </Link>
      </div>
      <p className={styles.description}>
        UI Graphic Designer | Instructional Designer Rise Articulate | Video Editor | Junior Coastal Skipper
      </p>
      <div className={styles.socialIcons}>
        <a href="https://www.linkedin.com/in/odibazo" target="_blank" rel="noopener noreferrer">
          <img src="/linkedin-icon.svg" alt="LinkedIn" className={styles.icon} />
        </a>
        <a href="https://www.behance.net/ODIBAZO" target="_blank" rel="noopener noreferrer">
          <img src="/behance-icon.svg" alt="Behance" className={styles.icon} />
        </a>
      </div>
    </div>
  );
}
