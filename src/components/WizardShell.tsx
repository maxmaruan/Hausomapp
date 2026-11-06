import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

export function WizardShell({
  step,
  totalSteps,
  eyebrow,
  title,
  subtitle,
  onBack,
  children,
  footer,
  bare = false,
}: {
  step: number;
  totalSteps: number;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  onBack: () => void;
  children: ReactNode;
  footer: ReactNode;
  bare?: boolean;
}) {
  return (
    <main className="app-shell wizard-shell">
      <header className="wizard-header">
        <button className="back-link wizard-back" onClick={onBack} aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <div className="wizard-progress">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <span className={`wizard-dot ${index <= step ? 'wizard-dot--active' : ''}`} key={index} />
          ))}
        </div>
      </header>
      <div className={`wizard-body ${bare ? 'wizard-body--bare' : ''}`}>
        {eyebrow && <p className="eyebrow wizard-eyebrow">{eyebrow}</p>}
        {title && <h1 className="wizard-title">{title}</h1>}
        {subtitle && <p className="wizard-subtitle">{subtitle}</p>}
        {children}
      </div>
      <div className="wizard-footer">{footer}</div>
    </main>
  );
}
