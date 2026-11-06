import { ArrowRight } from 'lucide-react';

export function SolutionScreen({ onNext }: { onNext: () => void }) {
  return (
    <main className="app-shell story-screen story-screen--solution">
      <img className="story-bg" src="mascot-home.png" alt="The same creature, happy and at home with a warm drink" />
      <div className="story-scrim" />
      <div className="story-hero-content">
        <div className="story-eyebrow">The solution</div>
        <h1 className="story-title">Until you find your people.</h1>
        <p className="story-tagline">
          Hausom matches you by who you are &#8212; so you find a home, and someone you can trust in it.
        </p>
      </div>
      <button className="primary-button primary-button--light primary-button--large story-cta" onClick={onNext}>
        Find your home <ArrowRight size={18} />
      </button>
    </main>
  );
}
