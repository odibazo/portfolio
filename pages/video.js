// pages/video.js

import styles from '../styles/Video.module.css';
import Link from 'next/link';

export default function Video() {
  const videos = [
    { src: 'https://www.youtube.com/embed/QbLhkPio5I0', title: 'Create or digitalize your very own training platform with Foxize Cloud' },
    { src: 'https://player.vimeo.com/video/347721188', title: 'Promo 01 - FoxizeCloud' },
    { src: 'https://player.vimeo.com/video/292086417', title: 'Foxize. Formación flexible para vidas apretadas' },
    { src: 'https://player.vimeo.com/video/289894113', title: 'Foxize: Programa Habilidades Digitales' },
    { src: 'https://player.vimeo.com/video/310336081', title: 'Foxize Empresas Servicios' },
    { src: 'https://player.vimeo.com/video/23605593', title: 'Simogas BBq' },
    { src: 'https://player.vimeo.com/video/474772314', title: 'PER-CARDS-PROMO' },
    { src: 'https://player.vimeo.com/video/10669381', title: 'Promo creditos' },
  ];

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
      <div className={styles.videoGallery}>
        {videos.map((video, index) => (
          <div key={index} className={styles.videoItem}>
            <iframe
              src={video.src}
              title={video.title}
              width="560"
              height="315"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <p className={styles.videoTitle}>{video.title}</p>
          </div>
        ))}
      </div>
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
