export function SplashScreen({ stage }: { stage: 0 | 1 }) {
  return (
    <main className="app-shell splash-screen">
      <div className={`splash-illustration splash-illustration--top ${stage === 1 ? 'splash-illustration--visible' : ''}`}>
        <img src="/Illustr_1.png" alt="" />
      </div>
      <div className={`splash-illustration splash-illustration--bottom ${stage === 1 ? 'splash-illustration--visible' : ''}`}>
        <img src="/Illustr_2.png" alt="" />
      </div>
      <div className="splash-mark">
        <img className={`splash-icon ${stage === 1 ? 'splash-icon--hidden' : ''}`} src="/figma/icons/h-icon-vector.svg" alt="" />
        <img className={`splash-logo ${stage === 1 ? 'splash-logo--visible' : ''}`} src="/figma/icons/logo-wordmark.svg" alt="Hausom" />
      </div>
    </main>
  );
}
