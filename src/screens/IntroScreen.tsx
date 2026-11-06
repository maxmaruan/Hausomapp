import { ArrowRight } from 'lucide-react';

export function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="app-shell intro-screen intro-hero">
      <video
        className="intro-video"
        src="intro-welcoming.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="4534_1.png"
      />
      <div className="intro-scrim" />
      <div className="intro-hero-content">
        <h1 className="intro-hero-title">
          Renting
          <br />
          but human
        </h1>
        <p className="intro-hero-tagline">
          Changing renting process from boring and hopeless to joyful and inspiring.
        </p>
      </div>
      <button className="primary-button primary-button--light primary-button--large intro-cta" onClick={onStart}>
        Get started <ArrowRight size={18} />
      </button>
    </main>
  );
}
