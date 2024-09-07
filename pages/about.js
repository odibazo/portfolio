// pages/about.js

import styles from '../styles/About.module.css'; // Ajustar esta ruta si es necesario
import Link from 'next/link';

export default function About() {
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
        I’m a Graphic, UI Designer, currently based in Barcelona (Spain). I love everything that has to do with Web design & development, Graphic design, Ux & Ui projects, Video, Instructional design and Scorm E-learning courses, Lighting and I feel a true devotion for the Art and Sailing sea.<br/><br/>
        I have many years of experience working as a freelance, now I’m working in an e-learning studio in Barcelona making and designing courses. I also work as a harbor sailor in Barcelona. Right now, I’m, as always, preparing for the next adventures and working for any product!<br/><br/>
        I love working with people, especially if they have the same passion I have for what they do.<br/><br/>
        See you soon!
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
