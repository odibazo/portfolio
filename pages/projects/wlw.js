import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import CursorTrail from '../../components/CursorTrail';
import home from '../../styles/Home.module.css';
import wlw from '../../styles/WlwProject.module.css';

export default function WlwProject() {
  return (
    <>
      <Head>
        <title>WLW — App concept & UX/UI | Odi Bazó</title>
        <meta name="description" content="WLW is an independent app concept by Odi Bazó exploring discovery, meaningful connections and community plans for adult women. In progress." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.odibazo.com/projects/wlw" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:title" content="WLW — App concept & UX/UI | Odi Bazó" />
        <meta property="og:description" content="An independent product concept for connecting women and discovering community plans. In progress." />
        <meta property="og:image" content="https://www.odibazo.com/images/wlw-preview-v11.png" />
      </Head>
      <main id="top" className={[home.container, wlw.page].join(' ')}>
        <CursorTrail />
        <header className={home.header}>
          <Link href="/" className={home.brand}>Odi Bazó</Link>
          <nav className={home.nav} aria-label="Main navigation">
            <Link href="/#work">Work</Link>
            <Link href="/#video">Video</Link>
            <Link href="/#about">About</Link>
            <Link href="/odi-studio">ODI Studio</Link>
          </nav>
        </header>

        <section className={[home.hero, wlw.hero].join(' ')} aria-labelledby="wlw-title">
          <div className={home.heroContent}>
            <p className={home.eyebrow}>
              <span className={home.statusDot} aria-hidden="true" />
              Independent project · UX/UI · In progress
            </p>
            <h1 id="wlw-title" className={[home.title, wlw.title].join(' ')}>
              WLW<span> Connection, discovery & community.</span>
            </h1>
            <p className={[home.description, wlw.description].join(' ')}>
              A digital product concept exploring how adult women can connect
              and discover local plans and events.
            </p>
            <div className={home.actions}>
              <Link className={home.secondaryButton} href="/#work">
                ← Back to selected work
              </Link>
            </div>
          </div>
        </section>

        <section className={wlw.caseStudy} aria-label="WLW concept preview">
          <div className={wlw.mockupStage}>
            <div className={wlw.device}>
              <Image
                src="/images/wlw-preview-v11.png"
                alt="WLW private prototype screen showing a discovery grid with fictional adult profiles"
                fill
                sizes="(max-width: 760px) 75vw, 400px"
                priority
              />
            </div>
            <span className={wlw.ribbon}>IN PROGRESS</span>
          </div>
          <div className={wlw.caseCopy}>
            <p className={home.kicker}>App concept / Visual UX</p>
            <h2>Discover people.<span>Make plans.</span></h2>
            <p>
              WLW is an independent project combining visual discovery,
              clear intentions and a community events experience.
            </p>
            <p>
              An interactive prototype exists and is currently in private evaluation.
              The screen shown here contains fictional demonstration profiles.
              WLW is not a launched service.
            </p>
            <div className={wlw.chips} aria-label="Project disciplines">
              <span>Product concept</span><span>UX/UI</span><span>Prototype</span>
            </div>
          </div>
        </section>

        <section className={wlw.bottomNav}>
          <Link href="/#work" className={home.textLink}>More selected work <span aria-hidden="true">↗</span></Link>
          <Link href="/odi-studio" className={home.textLink}>Explore ODI Studio <span aria-hidden="true">↗</span></Link>
        </section>
        <footer className={home.footer}>
          <span>Odi Bazó · Barcelona</span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </main>
    </>
  );
}
