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
              <svg className="artwork" viewBox="110 100 800 1340" role="img" aria-label="Ilustración Ciprina en rosa pastel y azul claro, vectorizada a partir del diseño aprobado de Odi Bazó" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F1B0CD" d="M243 329 L221 339 L205 361 L186 419 L171 491 L163 563 L161 656 L174 798 L193 900 L220 1003 L260 1125 L296 1220 L350 1340 L372 1358 L400 1361 L417 1353 L425 1344 L433 1325 L433 1307 L362 1152 L328 1063 L290 933 L266 818 L252 702 L250 582 L258 501 L271 440 L289 385 L290 361 L283 345 L274 336 L258 329 Z"/>
                <path fill="#F1B0CD" d="M666 148 L648 154 L635 166 L627 185 L627 201 L672 357 L723 581 L746 724 L760 870 L763 951 L760 1094 L748 1201 L723 1341 L728 1359 L738 1372 L754 1381 L774 1383 L795 1375 L814 1348 L833 1272 L847 1191 L859 1037 L859 951 L853 853 L837 721 L816 596 L784 448 L736 260 L708 168 L688 151 Z"/>
                <path fill="#AFE4FB" fillRule="evenodd" d="M483 233 L454 244 L429 274 L408 321 L389 390 L370 493 L360 584 L358 665 L364 757 L380 871 L402 980 L436 1095 L470 1183 L506 1256 L529 1285 L557 1301 L596 1305 L618 1298 L630 1287 L639 1268 L638 1244 L632 1232 L621 1222 L576 1213 L531 1125 L501 1043 L483 978 L464 880 L454 803 L443 670 L444 563 L461 439 L487 338 L504 406 L532 551 L510 559 L498 570 L485 592 L476 618 L467 660 L462 709 L466 810 L482 902 L508 986 L520 1009 L536 1027 L566 1040 L592 1039 L611 1030 L625 1013 L637 979 L639 806 L629 650 L604 487 L559 288 L545 261 L529 244 L506 234 Z M546 658 L557 767 L558 886 L546 838 L538 767 L538 710 Z"/>
              </svg>
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

        /* Desktop editorial fit: present the artwork and copy above the fold. */
        @media(min-width:761px){
          .sitebar{padding-top:18px;padding-bottom:18px}
          .intro{padding-top:clamp(20px,3.1vh,38px);padding-bottom:clamp(20px,3.1vh,38px)}
          .intro h1{font-size:clamp(45px,5.2vw,76px);line-height:.9;margin:18px 0 14px}
          .intro>p{font-size:clamp(14px,1.25vw,17px);line-height:1.35}
          .workTop{padding-top:7px;padding-bottom:7px}
          .artColumn,.languageColumn{min-height:clamp(385px,51vh,510px)}
          .artwork{height:clamp(260px,37vh,370px)}
          .artColumn{padding-bottom:33px}
          .columnNumber{margin-bottom:clamp(20px,3vh,38px)}
          .flagRow{margin-bottom:14px}
          .languageColumn{padding-top:18px;padding-bottom:25px}
          .languageColumn h2{font-size:clamp(33px,2.65vw,45px);margin-bottom:20px}
          .definition{margin-bottom:16px}
          .definition p{font-size:clamp(12px,1.08vw,14px);line-height:1.42;margin-top:7px}
          .poetic p{font-size:clamp(13px,1.14vw,15px)}
          .artFooter{bottom:15px}
          .scrollHint{padding-top:9px;padding-bottom:9px}
          .bottom{padding-top:45px}
        }
        @media(prefers-reduced-motion:reduce){.controls button{transition:none}}
      `}</style>
    </>
  );
}
