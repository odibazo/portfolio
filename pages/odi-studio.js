import Head from 'next/head';
import Link from 'next/link';
import CursorTrail from '../components/CursorTrail';
import home from '../styles/Home.module.css';
import studio from '../styles/Studio.module.css';

const services = [
  {
    number: '01',
    title: 'Diseño digital',
    description: 'Identidad visual, diseño gráfico, UX/UI, landing pages y sitios web.',
  },
  {
    number: '02',
    title: 'Eventos y comunidades',
    description: 'Cartelería, campañas digitales, piezas para redes y materiales promocionales.',
  },
  {
    number: '03',
    title: 'E-learning',
    description: 'Diseño y producción de cursos con Articulate Rise 360, contenidos interactivos y SCORM.',
  },
];

export default function OdiStudio() {
  return (
    <>
      <Head>
        <title>ODI Studio — Diseño digital para proyectos de mujeres | Odi Bazó</title>
        <meta
          name="description"
          content="ODI Studio: diseño digital, identidad visual, eventos y e-learning para proyectos impulsados por mujeres, especialmente de la comunidad lésbica y queer."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.odibazo.com/odi-studio" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:title" content="ODI Studio — Diseño digital para proyectos de mujeres" />
        <meta property="og:description" content="Diseño digital, comunicación visual y e-learning para mujeres, emprendedoras y proyectos queer." />
        <meta property="og:url" content="https://www.odibazo.com/odi-studio" />
      </Head>

      <main id="top" lang="es" className={[home.container, studio.page].join(' ')}>
        <CursorTrail />
        <header className={home.header}>
          <Link href="/" className={home.brand} aria-label="Odi Bazó, volver al inicio">Odi Bazó</Link>
          <nav className={home.nav} aria-label="Main navigation">
            <Link href="/#work">Work</Link>
            <Link href="/#video">Video</Link>
            <Link href="/#about">About</Link>
            <Link href="/odi-studio" aria-current="page" className={studio.activeNav}>Studio</Link>
          </nav>
        </header>

        <section className={[home.hero, studio.hero].join(' ')} aria-labelledby="studio-title">
          <div className={home.heroContent}>
            <p className={home.eyebrow}>
              <span className={home.statusDot} aria-hidden="true" />
              ODI Studio · Proyectos WLW / queer
            </p>
            <h1 id="studio-title" className={[home.title, studio.heading].join(' ')}>
              ODI Studio
              <span>Diseño digital para proyectos de mujeres.</span>
            </h1>
            <p className={[home.description, studio.intro].join(' ')}>
              Diseño, comunicación visual y e-learning para mujeres lesbianas, queer y emprendedoras.
              Soluciones creativas adaptadas a cada proyecto.
            </p>
            <div className={home.actions}>
              <a
                className={home.primaryButton}
                href="https://www.linkedin.com/in/odibazo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cuéntame tu proyecto <span aria-hidden="true">↗</span>
              </a>
              <Link className={home.secondaryButton} href="/#work">
                Ver trabajos <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className={studio.serviceSection} aria-label="Servicios de ODI Studio">
          <div className={studio.serviceGrid}>
            {services.map((service) => (
              <article className={studio.serviceCard} key={service.number}>
                <p className={studio.serviceNum}>{service.number} / 03</p>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={studio.contact} aria-labelledby="studio-contact-title">
          <p className={home.kicker}>Colaboremos</p>
          <h2 id="studio-contact-title">¿Tienes un proyecto en mente?</h2>
          <p>
            Cuéntame qué necesitas y hablamos sobre cómo puedo ayudarte.
            Cada propuesta se valora personalmente según sus características, plazos y disponibilidad.
          </p>
          <div className={studio.contactActions}>
            <a
              className={home.primaryButton}
              href="https://www.linkedin.com/in/odibazo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablemos de tu proyecto <span aria-hidden="true">↗</span>
            </a>
            <Link className={home.secondaryButton} href="/">
              Volver al portfolio <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <footer className={home.footer}>
          <span>Odi Bazó · Barcelona</span>
          <a href="#top">Volver arriba ↑</a>
        </footer>
      </main>
    </>
  );
}
