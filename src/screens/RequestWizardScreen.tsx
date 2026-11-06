import { useState } from 'react';
import { Building2, Check, DoorOpen, Sparkles, Users } from 'lucide-react';
import { LookingFor, RequestData, RequestDuration } from '../types';
import { lifestyleTags, mustHaveTags } from '../data/vocabulary';
import { WizardShell } from '../components/WizardShell';
import { TagPicker } from '../components/TagPicker';

const TOTAL_STEPS = 7;

const lookingForOptions: { id: LookingFor; title: string; subtitle: string; icon: typeof DoorOpen }[] = [
  { id: 'room', title: 'A room in a shared flat', subtitle: 'Your own room, shared kitchen and living space.', icon: DoorOpen },
  { id: 'apartment', title: 'A whole apartment', subtitle: 'The entire place, just for you.', icon: Building2 },
  { id: 'entire-home', title: 'Roommates to join me', subtitle: 'I already have the place, looking for people.', icon: Users },
];

const durationOptions: { id: RequestDuration; label: string }[] = [
  { id: 'short', label: 'Short term (< 3 months)' },
  { id: 'medium', label: '3–6 months' },
  { id: 'long', label: '6+ months' },
  { id: 'any', label: 'Flexible' },
];

export function RequestWizardScreen({
  request,
  setRequest,
  onExit,
}: {
  request: RequestData;
  setRequest: (updater: (prev: RequestData) => RequestData) => void;
  onExit: () => void;
}) {
  const [step, setStep] = useState(0);

  const toggleLifestyle = (id: string) =>
    setRequest((prev) => ({
      ...prev,
      lifestyleTags: prev.lifestyleTags.includes(id) ? prev.lifestyleTags.filter((t) => t !== id) : [...prev.lifestyleTags, id],
    }));

  const toggleMustHave = (id: string) =>
    setRequest((prev) => ({
      ...prev,
      mustHaves: prev.mustHaves.includes(id) ? prev.mustHaves.filter((t) => t !== id) : [...prev.mustHaves, id],
    }));

  const back = () => (step === 0 ? onExit() : setStep((s) => s - 1));
  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));

  if (step === 0) {
    return (
      <WizardShell step={0} totalSteps={TOTAL_STEPS} onBack={onExit} bare footer={null}>
        <div className="wizard-intro">
          <span className="wizard-intro-icon">
            <Sparkles size={26} />
          </span>
          <p className="eyebrow">YOUR REQUEST</p>
          <h1>A few questions, then we do the matching</h1>
          <p className="wizard-intro-copy">
            The more specific you are, the better your matches — this is exactly what the matching score is built on.
          </p>
          <button className="primary-button" onClick={() => setStep(1)}>
            Start
          </button>
          <button className="wizard-skip" onClick={onExit}>
            Maybe later
          </button>
        </div>
      </WizardShell>
    );
  }

  if (step === 1) {
    return (
      <WizardShell
        step={1}
        totalSteps={TOTAL_STEPS}
        eyebrow="STEP 1 OF 5"
        title="What are you looking for?"
        onBack={back}
        footer={
          <button className="primary-button" onClick={next}>
            Continue
          </button>
        }
      >
        <div className="role-options">
          {lookingForOptions.map(({ id, title, subtitle, icon: Icon }) => {
            const selected = request.lookingFor === id;
            return (
              <button
                key={id}
                className={`role-card ${selected ? 'role-card--selected' : ''}`}
                onClick={() => setRequest((prev) => ({ ...prev, lookingFor: id }))}
              >
                <span className="role-icon">
                  <Icon size={20} color={selected ? '#FFFFFF' : '#123C28'} />
                </span>
                <span className="role-text">
                  <strong>{title}</strong>
                  <small>{subtitle}</small>
                </span>
                {selected && <Check size={18} />}
              </button>
            );
          })}
        </div>
      </WizardShell>
    );
  }

  if (step === 2) {
    return (
      <WizardShell
        step={2}
        totalSteps={TOTAL_STEPS}
        eyebrow="STEP 2 OF 5"
        title="Where and when?"
        onBack={back}
        footer={
          <button className="primary-button" onClick={next}>
            Continue
          </button>
        }
      >
        <p className="wizard-section-label">LOCATION</p>
        <input
          className="wizard-input"
          type="text"
          value={request.location}
          onChange={(event) => setRequest((prev) => ({ ...prev, location: event.target.value }))}
        />
        <p className="wizard-section-label">MOVE-IN DATE</p>
        <input
          className="wizard-input"
          type="text"
          placeholder="e.g. From May 2026"
          value={request.moveInDate}
          onChange={(event) => setRequest((prev) => ({ ...prev, moveInDate: event.target.value }))}
        />
        <p className="wizard-section-label">DURATION</p>
        <div className="chip-group">
          {durationOptions.map(({ id, label }) => (
            <button
              key={id}
              className={`chip ${request.duration === id ? 'chip--selected' : ''}`}
              onClick={() => setRequest((prev) => ({ ...prev, duration: id }))}
            >
              {label}
            </button>
          ))}
        </div>
      </WizardShell>
    );
  }

  if (step === 3) {
    const span = request.budgetMax - request.budgetMin;
    return (
      <WizardShell
        step={3}
        totalSteps={TOTAL_STEPS}
        eyebrow="STEP 3 OF 5"
        title="What’s your budget?"
        subtitle="Per month, all-in. We’ll only show you matches inside this range."
        onBack={back}
        footer={
          <button className="primary-button" onClick={next}>
            Continue
          </button>
        }
      >
        <div className="budget-row">
          <label>
            <span>Min</span>
            <div className="budget-input">
              <span>€</span>
              <input
                type="number"
                value={request.budgetMin}
                onChange={(event) => setRequest((prev) => ({ ...prev, budgetMin: Number(event.target.value) || 0 }))}
              />
            </div>
          </label>
          <label>
            <span>Max</span>
            <div className="budget-input">
              <span>€</span>
              <input
                type="number"
                value={request.budgetMax}
                onChange={(event) => setRequest((prev) => ({ ...prev, budgetMax: Number(event.target.value) || 0 }))}
              />
            </div>
          </label>
        </div>
        <div className="budget-bar">
          <div className="budget-bar-fill" style={{ width: `${Math.min(100, (span / 2000) * 100)}%` }} />
        </div>
        <p className="wizard-note">€{request.budgetMin} – €{request.budgetMax} / month</p>
      </WizardShell>
    );
  }

  if (step === 4) {
    return (
      <WizardShell
        step={4}
        totalSteps={TOTAL_STEPS}
        eyebrow="STEP 4 OF 5"
        title="What’s your lifestyle like?"
        subtitle="This is what we match on — be honest, not aspirational."
        onBack={back}
        footer={
          <button className="primary-button" onClick={next}>
            Continue
          </button>
        }
      >
        <TagPicker options={lifestyleTags} selected={request.lifestyleTags} onToggle={toggleLifestyle} />
      </WizardShell>
    );
  }

  if (step === 5) {
    return (
      <WizardShell
        step={5}
        totalSteps={TOTAL_STEPS}
        eyebrow="STEP 5 OF 5"
        title="What’s non-negotiable?"
        subtitle="Pick what you won’t compromise on. We’ll only surface matches that clear these."
        onBack={back}
        footer={
          <button className="primary-button" onClick={next}>
            Review request
          </button>
        }
      >
        <TagPicker options={mustHaveTags} selected={request.mustHaves} onToggle={toggleMustHave} />
      </WizardShell>
    );
  }

  const lookingForLabel = lookingForOptions.find((option) => option.id === request.lookingFor)?.title;
  const durationLabel = durationOptions.find((option) => option.id === request.duration)?.label;

  return (
    <WizardShell
      step={6}
      totalSteps={TOTAL_STEPS}
      eyebrow="READY TO GO"
      title="Here’s what we’ll match on"
      onBack={back}
      footer={
        <button
          className="primary-button"
          onClick={() => {
            setRequest((prev) => ({ ...prev, submitted: true }));
            onExit();
          }}
        >
          Create request
        </button>
      }
    >
      <div className="review-card">
        <div className="review-row">
          <span>Looking for</span>
          <strong>{lookingForLabel}</strong>
        </div>
        <div className="review-row">
          <span>Location</span>
          <strong>{request.location}</strong>
        </div>
        <div className="review-row">
          <span>Move-in</span>
          <strong>{request.moveInDate || 'Flexible'}</strong>
        </div>
        <div className="review-row">
          <span>Duration</span>
          <strong>{durationLabel}</strong>
        </div>
        <div className="review-row">
          <span>Budget</span>
          <strong>
            €{request.budgetMin} – €{request.budgetMax}
          </strong>
        </div>
      </div>
      {request.lifestyleTags.length > 0 && (
        <>
          <p className="wizard-section-label">LIFESTYLE</p>
          <TagPicker options={lifestyleTags.filter((t) => request.lifestyleTags.includes(t.id))} selected={request.lifestyleTags} onToggle={() => {}} />
        </>
      )}
      {request.mustHaves.length > 0 && (
        <>
          <p className="wizard-section-label">MUST-HAVES</p>
          <TagPicker options={mustHaveTags.filter((t) => request.mustHaves.includes(t.id))} selected={request.mustHaves} onToggle={() => {}} />
        </>
      )}
    </WizardShell>
  );
}
