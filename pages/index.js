import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const projects = [
  { title: 'Foxize Cloud', category: 'Web design & digital product', image: '/images/foxizecloud-current.jpg', href: 'https://www.foxizecloud.com/' },
  { title: 'Foxize', category: 'Corporate website & digital design', image: '/images/foxize-current.jpg', href: 'https://www.foxize.com/' },
  { title: 'PER Cards', category: 'Product & game design', image: '/images/PER-CARDS-2020ODIBAZO-9-1.webp', href: 'https://www.behance.net/gallery/107191195/La-baraja-de-cartas-para-PER' },
  { title: 'Today I’m', category: 'Mobile app design', image: '/images/TODAYIM_PRESENTACION01-01-low.png' },
  { title: 'BcnByBike', category: 'Mobile experience', image: '/images/webBCNBYBIKE-artboard1.webp' },
  { title: 'Meraki Therapy', category: 'Web design', image: '/images/webmerakytherapy.webp' },
  { title: 'CyclingBCN', category: 'Digital design', image: '/images/webcyclingbcn.webp' },
  { title: 'Astrogestalt', category: 'Web design', image: '/images/webastrogestalt.webp' },
  { title: 'Bouncing Shield', category: 'Web experience', image: '/images/Desktop-HD-BOUNCING.png' },
];

const videos = [
  { src: 'https://www.youtube.com/embed/QbLhkPio5I0', title: 'Create or digitalize your training platform — Foxize Cloud' },
  { src: 'https://player.vimeo.com/video/347721188', title: 'Foxize Cloud — Promo' },
  { src: 'https://player.vimeo.com/video/292086417', title: 'Foxize — Formación flexible para vidas apretadas' },
  { src: 'https://player.vimeo.com/video/474772314', title: 'PER Cards — Promo' },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Odi Bazó',
  url: 'https://www.odibazo.com/',
  jobTitle: 'Visual, UX/UI and e-learning designer',
  homeLocation: { '@type': 'Place', name: 'Barcelona, Spain' },
  sameAs: ['https://www.linkedin.com/in/odibazo', 'https://www.behance.net/ODIBAZO'],
  knowsAbout: ['Visual design', 'UX/UI design', 'E-learning', 'Instructional design', 'Video editing'],
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Odi Bazó — Visual, UX/UI & E-learning Designer</title>
        <meta name="description" content="Selected work by Odi Bazó, a visual, UX/UI and e-learning designer based in Barcelona." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.odibazo.com/" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Odi Bazó — Visual, UX/UI & E-learning Designer" />
        <meta property="og:description" content="Digital experiences, visual identities and interactive learning content." />
        <meta property="og:url" content="https://www.odibazo.com/" />
        <meta property="og:image" content="https://www.odibazo.com/images/PER-CARDS-2020ODIBAZO-9-1.webp" />
        <meta property="og:locale" content="en_GB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Odi Bazó — Visual, UX/UI & E-learning Designer" />
        <meta name="twitter:description" content="Digital experiences, visual identities and interactive learning content." />
        <meta name="twitter:image" content="https://www.odibazo.com/images/PER-CARDS-2020ODIBAZO-9-1.webp" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <main id="top" className={styles.container}>
        <header className={styles.header}>
          <a href="#top" className={styles.brand} aria-label="Odi Bazó, back to top">Odi Bazó</a>
          <nav className={styles.nav} aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#video">Video</a>
            <a href="#about">About</a>
          </nav>
        </header>

        <section className={styles.hero} aria-labelledby="hero-title">
          <p className={styles.eyebrow}><span className={styles.statusDot} aria-hidden="true" />Barcelona · Available for selected projects</p>
          <h1 id="hero-title" className={styles.title}>Visual, UX/UI &amp;<span> e-learning designer.</span></h1>
          <p className={styles.description}>I design clear digital experiences, visual identities and interactive learning content.</p>
          <div className={styles.actions}>
            <a href="#work" className={styles.primaryButton}>View selected work <span aria-hidden="true">↓</span></a>
            <a href="https://www.linkedin.com/in/odibazo" target="_blank" rel="noopener noreferrer" className={styles.secondaryButton}>Contact me</a>
          </div>
          <div className={styles.disciplines} aria-label="Design disciplines">
            <span>E-learning</span><span>UX/UI</span><span>Graphic Design</span><span>Video</span>
          </div>
        </section>

        <section id="work" className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionNumber}>01</p>
            <div><p className={styles.kicker}>Selected work</p><h2>Projects shaped around clarity, learning and visual impact.</h2></div>
          </div>
          <div className={styles.projectGrid}>
            {projects.map((project, index) => {
              const CardTag = project.href ? 'a' : 'article';
              return (
              <CardTag
                key={project.title}
                className={styles.projectCard}
                href={project.href}
                target={project.href ? '_blank' : undefined}
                rel={project.href ? 'noopener noreferrer' : undefined}
                aria-label={project.href ? `${project.title}, open project` : undefined}
              >
                <div className={styles.projectImage}>
                  <Image src={project.image} alt={project.title} fill sizes="(max-width: 760px) 100vw, 50vw" />
                  <div className={styles.projectOverlay}>
                    <span>{project.href ? '↗' : String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>
                <div className={styles.projectMeta}><h3>{project.title}</h3><p>{project.category}</p></div>
              </CardTag>
            )})}
          </div>
          <a href="https://www.behance.net/ODIBAZO" target="_blank" rel="noopener noreferrer" className={styles.textLink}>
            Explore more projects on Behance <span aria-hidden="true">↗</span>
          </a>
        </section>

        <section id="video" className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionNumber}>02</p>
            <div><p className={styles.kicker}>Motion &amp; video</p><h2>Selected audiovisual work for digital products and learning.</h2></div>
          </div>
          <div className={styles.videoGrid}>
            {videos.map((video) => (
              <article key={video.src} className={styles.videoCard}>
                <div className={styles.videoFrame}>
                  <iframe src={video.src} title={video.title} loading="lazy" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
                <h3>{video.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className={styles.section + ' ' + styles.aboutSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionNumber}>03</p>
            <div><p className={styles.kicker}>About</p><h2>Multidisciplinary by practice, focused by design.</h2></div>
          </div>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutCopy}>
              <p>I’m a multidisciplinary designer based in Barcelona, focused on digital experiences, visual communication and interactive learning.</p>
              <p>I combine graphic design, UX/UI, instructional design and video to turn complex information into clear, useful and engaging content.</p>
              <p className={styles.personalNote}>Outside the screen, sailing has taught me attention, adaptability and calm under pressure.</p>
            </div>
            <div className={styles.capabilities}>
              <p className={styles.kicker}>What I do</p>
              <ul>
                <li>UX/UI &amp; digital product design</li>
                <li>E-learning &amp; instructional design</li>
                <li>Visual identity &amp; graphic design</li>
                <li>Video editing &amp; motion content</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className={styles.contactSection}>
          <p className={styles.kicker}>Let’s work together</p>
          <h2>Have a project in mind?</h2>
          <div className={styles.contactLinks}>
            <a href="https://www.linkedin.com/in/odibazo" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="https://www.behance.net/ODIBAZO" target="_blank" rel="noopener noreferrer">Behance <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <footer className={styles.footer}><span>Odi Bazó · Barcelona</span><a href="#top">Back to top ↑</a></footer>
      </main>
    </>
  );
}
