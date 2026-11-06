import { ArrowRight } from 'lucide-react';

export function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="app-shell intro-screen">
      <div className="intro-copy">
        <h1>
          Hausom is a community based App,
          <br />
          Aiming to change renting process from boring and hopeless to joyful and inspiring.
        </h1>
        <p>We are building the shortest path between two people looking for the same thing: a home and someone they can trust in it.</p>
      </div>
      <div className="intro-illustration-wrap">
        <img src="/4534_1.png" alt="Landlord welcoming two tenants into a bright apartment" />
      </div>
      <button className="primary-button primary-button--light primary-button--large intro-cta" onClick={onStart}>
        GET STARTED <ArrowRight size={18} />
      </button>
    </main>
  );
}
