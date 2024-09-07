// pages/ui-graphic-design.js

import styles from '../styles/UI.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function UIGraphicDesign() {
  const images = [
    { src: '/images/foxizecloud2020-1.webp', alt: 'Image 1', title: 'UI & web Design for Foxize', width: 380, height: 570 },
    { src: '/images/foxizecloud2020-vertical.webp', alt: 'Image 2', title: 'UI & web Design for Foxize school', width: 380, height: 570 },
    { src: '/images/TODAYIM_PRESENTACION01-01-low.png', alt: 'Image 3', title: 'App Design', width: 380, height: 570 }, 
    { src: '/images/TODAYiphonexMOCKUP2.webp', alt: 'Image 4', title: 'App Design', width: 380, height: 570 },
    { src: '/images/Desktop-HD-BOUNCING.png', alt: 'Image 5', title: 'Web Design', width: 380, height: 570 },
    { src: '/images/webastrogestalt.webp', alt: 'Image 6', title: 'Web Design for astrogestalt.com', width: 380, height: 570 },
    { src: '/images/webBCNBYBIKE-artboard1.webp', alt: 'Image 7', title: 'App Design', width: 380, height: 570 },
    { src: '/images/webchiprina.webp', alt: 'Image 8', title: 'Web Design', width: 380, height: 570 },
    { src: '/images/webcyclingbcn.webp', alt: 'Image 9', title: 'Web Design', width: 380, height: 570 },
    { src: '/images/webleonorurdaneta.webp', alt: 'Image 10', title: 'Web Design', width: 380, height: 570 },
    { src: '/images/webmerakytherapy.webp', alt: 'Image 11', title: 'Web Design', width: 380, height: 570 },
    { src: '/images/webnaveler.webp', alt: 'Image 12', title: 'Web Design naveler', width: 380, height: 570 },
    { src: '/images/webpae.webp', alt: 'Image 13', title: 'Web Design Public affair experts', width: 380, height: 570 },
    { src: '/images/PER-CARDS-2020ODIBAZO-9-1.webp', alt: 'Image 16', title: 'Cards Game design', width: 380, height: 570 },
    { src: '/images/PER-CARDS-2020ODIBAZO-5.webp', alt: 'Image 17', title: 'Cards Game design', width: 380, height: 570 },
    { src: '/images/logodelavidaproducciones.webp', alt: 'Image 18', title: 'Logo design', width: 380, height: 380 },
    { src: '/images/logobts.webp', alt: 'Image 19', title: 'Logo Bts design', width: 380, height: 380 },
    { src: '/images/logosubstantialsound.webp', alt: 'Image 20', title: 'Logo Substantial design', width: 380, height: 380 },
    { src: '/images/extracorpiesessualita.webp', alt: 'Image 22', title: 'Poster design', width: 380, height: 570 },
    { src: '/images/extrabodegon-odibazo.webp', alt: 'Image 23', title: 'Poster design Odi Bazo', width: 380, height: 570 },
    { src: '/images/extracono-odibazo.webp', alt: 'Image 24', title: 'Poster design Odi Bazo', width: 380, height: 570 },
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
      <div className={styles.imageGallery}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageItem}>
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} layout="intrinsic" />
            <p className={styles.imageTitle}>{image.title}</p>
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
