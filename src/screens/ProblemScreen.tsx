import { ArrowRight } from 'lucide-react';

export function ProblemScreen({ onNext }: { onNext: () => void }) {
  return (
    <main className="app-shell story-screen story-screen--problem">
      <img className="story-bg" src="mascot-sad.png" alt="A lonely, worn-out creature with nowhere to call home" />
      <div className="story-scrim" />
      <div className="story-hero-content">
        <div className="story-eyebrow story-eyebrow--muted">The problem</div>
        <h1 className="story-title">Finding a home feels lonely and cold.</h1>
        <p className="story-tagline">
          A hundred messages out, a few replies back &#8212; judged on your papers before anyone learns your name.
        </p>
      </div>
      <button className="primary-button primary-button--light primary-button--large story-cta" onClick={onNext}>
        Next <ArrowRight size={18} />
      </button>
    </main>
  );
}
