import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Odi Bazó — Visual, UX/UI & E-learning Designer</title>
        <meta
          name="description"
          content="Portfolio of Odi Bazó, a visual, UX/UI and e-learning designer based in Barcelona."
        />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <Link href="/" className={styles.brand}>
            Odi Bazó
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            <Link href="/ui-graphic-design">Work</Link>
            <Link href="/video">Video</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>

        <section className={styles.hero}>
          <p className={styles.eyebrow}>
            <span className={styles.statusDot} aria-hidden="true" />
            Barcelona · Available for selected projects
          </p>

          <h1 className={styles.title}>
            Visual, UX/UI &amp;
            <span> e-learning designer.</span>
          </h1>

          <p className={styles.description}>
            I design clear digital experiences, visual identities and interactive
            learning content.
          </p>

          <div className={styles.actions}>
            <Link href="/ui-graphic-design" className={styles.primaryButton}>
              View selected work
              <span aria-hidden="true">↗</span>
            </Link>
            <a href="mailto:odibazo@gmail.com" className={styles.secondaryButton}>
              Contact me
            </a>
          </div>

          <div className={styles.disciplines} aria-label="Design disciplines">
            <span>E-learning</span>
            <span>UX/UI</span>
            <span>Graphic Design</span>
            <span>Video</span>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>Independent designer · Barcelona</span>
          <div className={styles.socialLinks}>
            <a href="https://www.linkedin.com/in/odibazo" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://www.behance.net/ODIBAZO" target="_blank" rel="noopener noreferrer">
              Behance
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
