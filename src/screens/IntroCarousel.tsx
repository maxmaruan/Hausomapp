import { useRef, useState } from 'react';

const SLIDES = 3;

export function IntroCarousel({ onDone }: { onDone: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.max(0, Math.min(SLIDES - 1, i)));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <main className="app-shell intro-carousel">
      <div className="ic-track" ref={trackRef} onScroll={handleScroll}>
        <section className="ic-slide intro-hero">
          <video className="intro-video" src="intro-welcoming.mp4" autoPlay muted loop playsInline preload="auto" poster="4534_1.png" />
          <div className="intro-scrim" />
          <div className="intro-hero-content">
            <h1 className="intro-hero-title">
              Renting
              <br />
              but human
            </h1>
            <p className="intro-hero-tagline">Changing renting process from boring and hopeless to joyful and inspiring.</p>
          </div>
        </section>

        <section className="ic-slide story-screen">
          <img className="story-bg" src="mascot-sad.png" alt="A lonely, worn-out creature with nowhere to call home" />
          <div className="story-scrim" />
          <div className="story-hero-content">
            <div className="story-eyebrow story-eyebrow--muted">The problem</div>
            <h1 className="story-title">Finding a home feels lonely and cold.</h1>
            <p className="story-tagline">
              A hundred messages out, a few replies back &#8212; judged on your papers before anyone learns your name.
            </p>
          </div>
        </section>

        <section className="ic-slide story-screen">
          <img className="story-bg" src="mascot-home.png" alt="The same creature, happy and at home with a warm drink" />
          <div className="story-scrim" />
          <div className="story-hero-content">
            <div className="story-eyebrow">The solution</div>
            <h1 className="story-title">Until you find your people.</h1>
            <p className="story-tagline">
              Hausom matches you by who you are &#8212; so you find a home, and someone you can trust in it.
            </p>
          </div>
        </section>
      </div>

      <div className="ic-bottom">
        <div className="ic-dots">
          {Array.from({ length: SLIDES }).map((_, i) => (
            <button
              key={i}
              className={`ic-dot ${i === active ? 'ic-dot--active' : ''}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button className={`ic-action ${active === SLIDES - 1 ? 'ic-action--final' : ''}`} onClick={onDone}>
          {active === SLIDES - 1 ? 'Get started' : 'Skip intro'}
        </button>
      </div>
    </main>
  );
}
