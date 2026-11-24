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
              <img className="artwork" src="data:image/webp;base64,UklGRjwJAABXRUJQVlA4IDAJAABQdwCdASpUARYCPm02lkgmIyIhJzjIoMANiWdu/CoYvvymfDO1Z9iCMWRhqPnB9+FGVez9At57uypLZPY4+L/5t0RIulQ6ZRnjjTD0yjPHGmHplGeONMPTKM8caYemUZ440w9MozxxphC4+8+MZrP2aN0UFn9MPTKM2ftSc88zibAzEBIzxxph6YnL05istIh2GwLWKFyq/Yg867lCb4kMyM8caYRGBRxZIRDCiElZ3e1+fhup9sb5dIeUonHilqb3xVFG9Z6koTgnHuW8VSI2iOakhB51hETyoZcvv/lLFrCa4djTJYljHkFbfDKJGX0YR5QzCs6ZSXBKibdisC6VDbCufpEivfM6dPh3kpoj/z9gg4h08UJ/lk7wbZ6dWtpIVEUzUemUZlNRetmJHRYA4wt8arb2K8KQQPLlQPM9ef0gcxyWYmmHomJPzqHAKU+g9Zpo+tsDk7NkpKBc/XAa1rvOblsjhNMSGZFaNqW2SVYF9zA7pY+j+GN9rEYSOhWeks6Qt5mEzTmYdMmzaDtszxyPa0o72U5N1nyfBQn7TFUcfbfwkMyK0bUP2ZEG2+/1gSgkRsYdZ+TdcbtUvzoGShM7mmHokXJyDlpO5xRNt3MfNWiII0zXEzF8ZWmkLxhxu2N3N4G9guVk1t3ZyN+iGO4WxQZf0EXmMbzLus9nNEH6VDoxV142gfQamR6zzmP3So3Z1d5OWC8Zh7VjgWfzqlAmlcklMkJXU8Lk0GxQYfjtz7SSmzUyNcSMmjzB4N8ukQSnizZe6xz0ayakCWLf0dApoELJrGTD1NKWIH6jo+XUNpUJ8Nx2IHA9mZ2UrCsM2Y2q/XnJfGXzh+zLqvtdQyot7KTq/W2bqDa+AgJUMwP2TFzH3SGHLn9TqgE83BdKgH8o9PKJIqMrQwlLyj413qracGyOBwI2WzFk0AnokplGb65VX2yzR7IfrqPlLjtewLGT28IYI3GbSABvl0OcGYruA+u79TPXnQwuEbRnegbAtAn6lHfph2wlcrchbOrgMV1QIuukz7EAhtoKO9Pf0P7aR0qHTJ2oSuU9v6dElMU0d8Su3kyjMtMaudMeq5InjNh+q2D4sRZ2eONKnOhGjYbIk7snUQqVCB4vpdFCfiyBelw1zwZaTuxjomlQ6ZRZ+uAarxIve1hzB84ndvfFW6LCeL5NNdso9LWcTD0yjO8Sb1vHy8/cBItxux8yQIA5WZhe49Mozxxph6ZRpGKG+XUOmUZ440w9Mozxxph6ZRnjjTD0yjPHGmHplGeONMPTBgAA/v7sQAAAAAAAAR2HkWw/Ueshc/gBPaX4eCFxGmgvGd10BgwpWKuADq3AN7M436DyovOM9F0FM2bVq+egJAU3YYFfKRU1pG8t0eqPwPGF10rTC+SPUGhD+GeSlMp6v16XaEeVugHTNOg+HfUoQTo8LzIFnZgDGHK8O5wRkbqhmS3k0ud4oF/p+V6G03+W2N6bEruQYU6h588gUnzly5GJZbfMi7c6rDBNzD8AA0ifmbVq2PPyTDOhWItHqehJwdU81c9LHn+FE1ndnjpfsdc8FmnzLBY28iMUVIpj6qEoIwz0NKObhAXuDjqbhwetvHA5C0T2GMj2sbA+UzP3XNRo303QqTnYofRXUfiweQsg1UPJhXEZKY2d1BJZliaAS1P/60bNVTLtuUReA4wHmMHYxQDWThjDANFoUe0EMI2ccyyT4s3imTltykSSFBOCK7qdIwvZ+iZFHpmVIbwWfbWWtw3RW+TTCRq2JIARAxxCQOQKA3e2i6cUUtBAYJrUqccCTA1jdaiGVwATZmTpI3pD/DNu+xLD3clWx9imbHhuKYyD/AlMzitRMdSjEXIoPLGQogCtazcxqolDIf+3oGK262v02F01YmfCJAEQ/noZOvFZoZJtof+Y8Lt3G4w/fIJW2O+/WDvFRiXDvSOYCUmb6s0pUOC3gx0i4+7sxYvCaZYQIAixiZZWlmsVz248gUqwliB1TU/3GQxd/ykBpmPv0qSojyiUrjRC8atakSLQeo5V/wLzwfXKyuTAqU5iVwXGU5ScmzIuTspMm8eVXHSjp2csHDIZCfJaWFBusb+YWx6FwUK3ihPJ8MsMI0mVUfmcaEXiPzor+tGvnSz1cu2oT9iaUWHdoDLyJf71DK0mu10lKc6Ml8vIV7k6OdtGxCqddyt8TuZk5gYUmkTu9oKzG+zbJI4cFJRDmx5kydaH/7u17KHFXssfV+TnqZ1J7NzHGmxJ9UOdpCbrlgsV0HYpkHEzhMxqlwVMtlya+/mi3OLiHUmhtuwflzf50ypiv1/n67ryxs7PQLn50u5bXdojuaYVZFnbDqtWiYl9FgdLCud2xYGiw/W67gnyPlzV54GkG8EWcQwStJwH7TSQMcHJ/u64XPwwE7zrVrK4IAKuH5Rj04dUU0RTvLo1at8G9JzJJUSEDmhZL10H0UXSnPiExi6bjC8ZoI6nuKQZ1yw1RYvLoh37vdJPa+OrD7RR7Iaisg+Fe6eOzVubf5cFcG8wKfFntVGwN14ZLh5jvzAyLHddcuhtxVtOf64mAJ1wk+XmTt9KiGWSzIdfFMePEX1OahY2Yq9qqK6vrTYhrLfoTPt5IZjDWdpRZwAMXHys2/xiQDNOJgj2MUQf6aM0ilFoyBqaXfrWtrZhnDqykiAidTot9uEtZgMICF2nclVjDj2uPKm/0iRBDE//Nadzyc6IX1eJFn7MM35QY9gzr5T+HCUrPapFTYT3QYAysnAUWZI0gBGxoK2AD/Vzfr3Dz++iF1B9MDQReO+sCNI3ToynSN0IkWjIOscN8y/+gbCuhQ6umf8CMPmIqTTp6MChWUUTTS/DN5s7TZDcIlTwiAcgRYPwFhRj0NQDlMeqJA0VD3WX8A1T3hCqtuBk6+u/XZhRSUMdb4ls4n7DOR+xWCYH6EPuaCyPFqCqLBr4zW0RcrF7rxWIIYfPYZwr9FdhdwpFV2aq/WfL9MdL0OYmcySdI9en3xkR1fTqX0Ptp7KxVftPhIV5bijKzcK8rTLGBBmYe5bGgRKdABYqI8n/TMKBH0VLfAS6JFIAAbDmZ2NfbpIlPfKH/GiHzKfsPNLlOqg4xAx0xLr1Qn7mRqKM+IJbd7lsAAAAAAAAAAAAAAA=" alt="Ilustración original de Ciprina de Odi Bazó, en rosa y azul claro" />
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
        .artwork{width:min(100%,280px);height:385px;object-fit:contain}
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
