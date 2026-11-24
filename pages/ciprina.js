import Head from 'next/head';
import Link from 'next/link';
import { useRef, useState } from 'react';

const entries = [
  {
    code: 'EN', language: 'English', flag: '🇬🇧', word: 'Cyprine',
    anatomy: 'A literary term for the natural fluid that lubricates the vagina during sexual arousal. Vaginal moisture comes from several physiological processes, rather than a single secretion.',
    poetry: 'A quiet language of the body. A word for what cannot always be said aloud.'
  },
  {
    code: 'ES', language: 'Español', flag: '🇪🇸', word: 'Ciprina',
    anatomy: 'Nombre literario del fluido que lubrica naturalmente la vagina durante la excitación sexual. La humedad vaginal procede de distintos procesos fisiológicos.',
    poetry: 'Una palabra para lo que el cuerpo cuenta antes de encontrar las palabras.'
  },
  {
    code: 'CA', language: 'Català', flag: '', word: 'Ciprina',
    anatomy: 'Terme literari per al fluid que lubrica de manera natural la vagina durant l’excitació sexual. Aquesta humitat prové de diversos processos fisiològics.',
    poetry: 'Una manera de dir que el cos també té la seva pròpia llengua.'
  },
  {
    code: 'FR', language: 'Français', flag: '🇫🇷', word: 'Cyprine',
    anatomy: 'Terme désignant la lubrification vaginale naturelle associée à l’excitation sexuelle. Cette humidité résulte de plusieurs mécanismes physiologiques.',
    poetry: 'Un mot pour la géographie secrète du désir.'
  },
  {
    code: 'IT', language: 'Italiano', flag: '🇮🇹', word: 'Ciprina',
    anatomy: 'Voce letteraria per indicare la lubrificazione vaginale naturale associata all’eccitazione sessuale. L’umidità deriva da diversi processi fisiologici.',
    poetry: 'Il desiderio ha una voce. A volte parla sottovoce.'
  },
  {
    code: 'TR', language: 'Türkçe', flag: '🇹🇷', word: 'Ciprina',
    anatomy: 'Cinsel uyarılma sırasında vajinanın doğal olarak kayganlaşmasını anlatmak için kullanılan edebî bir sözcük. Bu nem, birden fazla fizyolojik süreçten kaynaklanır.',
    poetry: 'Bedenin, sözcüklere ihtiyaç duymadan anlattığı hikâye.'
  },
  {
    code: 'EL', language: 'Ελληνικά', flag: '🇬🇷', word: 'Ciprina',
    anatomy: 'Λογοτεχνικός όρος για τη φυσική κολπική λίπανση που σχετίζεται με τη σεξουαλική διέγερση. Η υγρασία προκύπτει από διαφορετικές φυσιολογικές διεργασίες.',
    poetry: 'Μια λέξη για όσα εκφράζει το σώμα χωρίς να μιλά.'
  }
];

export default function WhatIsCiprina() {
  const track = useRef(null);
  const [position, setPosition] = useState(0);

  function navigate(direction) {
    if (!track.current) return;
    const width = track.current.querySelector('[data-column]')?.getBoundingClientRect().width || 320;
    track.current.scrollBy({ left: direction * (width + 24), behavior: 'smooth' });
  }
  function onScroll() {
    if (!track.current) return;
    const el = track.current;
    const distance = el.scrollWidth - el.clientWidth;
    setPosition(distance > 0 ? Math.round((el.scrollLeft / distance) * 100) : 100);
  }

  return (
    <>
      <Head>
        <title>What Is Ciprina? · Artistic Obsessions · Odi Bazó</title>
        <meta name="description" content="What Is Ciprina? A multilingual visual and editorial experiment about language, anatomy and desire by Odi Bazó." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.odibazo.com/ciprina" />
        <meta property="og:title" content="What Is Ciprina? · Odi Bazó" />
        <meta property="og:description" content="Seven languages. One word. An experimental visual archive." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.odibazo.com/ciprina" />
      </Head>

      <main className="ciprina" lang="en">
        <header className="sitebar">
          <Link href="/#about" className="back">← <span>ARTISTIC OBSESSIONS</span></Link>
          <Link href="/" className="signature">ODI BAZÓ <span>↗</span></Link>
        </header>

        <section className="intro" aria-labelledby="ciprina-title">
          <div className="introTop">
            <span className="label">AN ARCHIVE REIMAGINED</span>
            <span className="edition">WEB EXPERIMENT / 2026</span>
          </div>
          <h1 id="ciprina-title">WHAT IS<br /><em>CIPRINA?</em></h1>
          <p>Seven languages. One intimate word.<br />An editorial exploration of anatomy, translation and desire.</p>
        </section>

        <section className="work" aria-label="Multilingual definitions of Ciprina">
          <div className="workTop">
            <div className="workCaption"><span>01 / 07</span> <span>SCROLL TO EXPLORE</span></div>
            <div className="controls">
              <button type="button" onClick={() => navigate(-1)} aria-label="Scroll left">←</button>
              <button type="button" onClick={() => navigate(1)} aria-label="Scroll right">→</button>
            </div>
          </div>
          <div className="track" ref={track} onScroll={onScroll} tabIndex={0} aria-label="Horizontal gallery of seven translations, use arrow buttons or swipe to explore">
            <div className="artColumn" data-column>
              <svg className="artwork" viewBox="0 0 300 450" role="img" aria-labelledby="artTitle" xmlns="http://www.w3.org/2000/svg">
                <title id="artTitle">Abstract intimate symbol based on the original pink and blue Ciprina illustration by Odi Bazó</title>
                <path d="M88 55 C46 143 59 293 113 390" fill="none" stroke="#DB578C" strokeWidth="24" strokeLinecap="round"/>
                <path d="M210 32 C235 132 251 294 219 404" fill="none" stroke="#DB578C" strokeWidth="24" strokeLinecap="round"/>
                <path d="M154 67 C124 56 111 116 111 192 C111 293 144 367 173 388" fill="none" stroke="#57BFD7" strokeWidth="29" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M158 168 C138 185 136 234 142 276 C148 318 166 319 171 278 C176 239 178 183 158 168Z" fill="#57BFD7"/>
                <path d="M160 203 C156 221 155 245 159 267" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity=".72"/>
              </svg>
              <p className="artNote">An abstract symbol<br />from the original project.</p>
              <span className="artFooter">CIPRINA / ODI BAZÓ</span>
            </div>
            {entries.map((entry, index) => (
              <article className="languageColumn" data-column key={entry.code} lang={entry.code === 'EL' ? 'el' : entry.code === 'CA' ? 'ca' : entry.code === 'TR' ? 'tr' : entry.code === 'FR' ? 'fr' : entry.code === 'IT' ? 'it' : entry.code === 'ES' ? 'es' : 'en'}>
                <div className="columnNumber">{String(index + 1).padStart(2, '0')} / 07</div>
                <div className="flagRow">
                  {entry.code === 'CA' ? <span className="senyera" role="img" aria-label="Bandera de Catalunya" /> : <span className="flag" role="img" aria-label={'Flag: ' + entry.language}>{entry.flag}</span>}
                  <span className="langName">{entry.language}</span>
                </div>
                <h2>{entry.word}</h2>
                <div className="definition">
                  <span className="sectionLabel">01 — ANATOMY</span>
                  <p>{entry.anatomy}</p>
                </div>
                <div className="definition poetic">
                  <span className="sectionLabel">02 — POETICS</span>
                  <p>{entry.poetry}</p>
                </div>
                <span className="columnFoot">{entry.code} — WHAT IS CIPRINA?</span>
              </article>
            ))}
          </div>
          <div className="progress" role="progressbar" aria-label="Horizontal gallery position" aria-valuemin={0} aria-valuemax={100} aria-valuenow={position}>
            <span style={{ left: (position * 0.82) + '%' }} />
          </div>
          <div className="scrollHint">← DRAG, SWIPE OR USE THE ARROWS TO READ ALL SEVEN LANGUAGES →</div>
        </section>

        <footer className="bottom">
          <p>AN EXPERIMENT IN LANGUAGE, ANATOMY & DESIRE.<br />REVISITING AN EARLY WEB PIECE BY ODI BAZÓ.</p>
          <Link href="/#about">BACK TO ARTISTIC OBSESSIONS ↗</Link>
        </footer>
      </main>

      <style jsx>{`
        *{box-sizing:border-box}
        .ciprina{--ink:#1a1b1e;--soft:#73757b;--line:#dedede;background:#fff;color:var(--ink);min-height:100vh;font-family:Arial,Helvetica,sans-serif;letter-spacing:.016em;overflow:hidden}
        .sitebar{display:flex;justify-content:space-between;align-items:center;padding:27px clamp(20px,5vw,82px);font-size:11px;letter-spacing:.13em;font-weight:700}
        .sitebar :global(a){color:var(--ink)}
        .back{display:inline-flex;align-items:center;gap:13px}
        .back:first-letter{font-size:19px}
        .signature{font-size:11px;display:flex;gap:14px;align-items:center}
        .intro{padding:clamp(55px,8vw,116px) clamp(20px,5vw,82px) clamp(55px,7vw,94px);max-width:1450px}
        .introTop{display:flex;justify-content:space-between;gap:20px;color:var(--soft);font-size:10px;letter-spacing:.19em;font-weight:700}
        .intro h1{font-size:clamp(48px,7vw,110px);line-height:.86;letter-spacing:-.076em;font-weight:600;margin:48px 0 35px;text-transform:uppercase}
        .intro h1 em{font-family:Georgia,'Times New Roman',serif;letter-spacing:-.072em;font-weight:400}
        .intro>p{font-family:Georgia,'Times New Roman',serif;font-size:clamp(16px,1.65vw,22px);line-height:1.5;letter-spacing:0;margin:0;color:#505057}
        .work{}
        .workTop{display:flex;align-items:center;justify-content:space-between;padding:15px clamp(20px,5vw,82px)}
        .workCaption{display:flex;gap:25px;font-size:10px;font-weight:700;letter-spacing:.12em;color:var(--soft)}
        .workCaption span:first-child{color:var(--ink)}
        .controls{display:flex;gap:12px}
        .controls button{width:43px;height:43px;border:1px solid #d9dadd;background:white;color:var(--ink);border-radius:50%;font-size:20px;cursor:pointer;transition:background .2s,color .2s}
        .controls button:hover{background:var(--ink);color:#fff}
        .controls button:focus-visible{outline:2px solid #DB578C;outline-offset:3px}
        .track{display:flex;gap:24px;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;padding:0 clamp(20px,5vw,82px) 0;scrollbar-width:none;outline-offset:-3px}
        .track::-webkit-scrollbar{display:none}
        .artColumn,.languageColumn{width:clamp(270px,27vw,355px);flex:0 0 clamp(270px,27vw,355px);min-height:555px;scroll-snap-align:start;position:relative}
        .artColumn{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:20px 22px 52px 0}
        .artwork{width:min(100%,280px);height:385px}
        .artNote{text-align:center;color:var(--soft);font-family:Georgia,serif;font-style:italic;font-size:14px;line-height:1.45;margin:0}
        .artFooter{position:absolute;bottom:26px;left:0;color:var(--soft);font-size:10px;letter-spacing:.16em}
        .languageColumn{padding:28px 28px 60px 2px;display:flex;flex-direction:column}
        .columnNumber{color:#95979d;font-size:10px;letter-spacing:.14em;margin-bottom:62px}
        .flagRow{display:flex;align-items:center;gap:14px;margin-bottom:25px}
        .flag{font-size:27px;line-height:1}
        .senyera{display:inline-block;width:36px;height:24px;background:repeating-linear-gradient(to bottom,#f4cf30 0 2.67px,#c93131 2.67px 5.33px);background-size:100% 21.33px}
        .langName{text-transform:uppercase;font-size:11px;letter-spacing:.15em;color:var(--soft);font-weight:700}
        .languageColumn h2{font-family:Georgia,'Times New Roman',serif;font-style:italic;font-size:clamp(38px,3vw,51px);line-height:1.1;letter-spacing:-.055em;font-weight:400;margin:0 0 36px}
        .definition{margin-bottom:26px}
        .sectionLabel{display:block;color:#92939a;font-size:9px;font-weight:700;letter-spacing:.17em}
        .definition p{font-size:15px;line-height:1.6;letter-spacing:0;margin:11px 0 0;max-width:295px}
        .poetic p{font-family:Georgia,'Times New Roman',serif;font-size:17px;font-style:italic;line-height:1.5;color:#4d4e55}
        .columnFoot{font-size:9px;letter-spacing:.15em;color:#a3a4a8;margin-top:auto}
        .progress{display:none}
        .progress>span{display:block;position:absolute;top:0;left:0;width:18%;height:100%;background:#1b1b1b;transform:translateX(0)}
        .scrollHint{text-align:right;padding:17px clamp(20px,5vw,82px);font-size:9px;color:#9a9ca0;letter-spacing:.12em}
        .bottom{padding:100px clamp(20px,5vw,82px) 55px;display:flex;justify-content:space-between;align-items:flex-end;gap:24px}
        .bottom p{margin:0;color:#777;line-height:1.8;font-size:10px;letter-spacing:.1em}
        .bottom :global(a){color:var(--ink);font-weight:700;font-size:10px;letter-spacing:.1em;padding-bottom:8px}
        @media(max-width:760px){
          .sitebar{padding-top:22px;padding-bottom:22px}
          .intro{padding-top:60px}
          .intro h1{font-size:clamp(44px,10vw,72px);margin:35px 0}
          .edition{display:none}
          .track{gap:18px}
          .artColumn,.languageColumn{width:min(83vw,330px);flex-basis:min(83vw,330px);min-height:540px}
          .languageColumn{padding-right:25px}
          .columnNumber{margin-bottom:55px}
          .artwork{height:370px}
          .bottom{padding:65px 20px 45px;align-items:flex-start;flex-direction:column}
          .scrollHint{text-align:left;line-height:1.5}
        }
        @media(prefers-reduced-motion:reduce){.controls button{transition:none}}
      `}</style>
    </>
  );
}
