import { useState } from 'react';
import { BadgeCheck, Camera, CheckCircle2, Lock, UserRound, Video } from 'lucide-react';
import { ProfileData } from '../types';
import { lifestyleTags } from '../data/vocabulary';
import { WizardShell } from '../components/WizardShell';
import { TagPicker } from '../components/TagPicker';

const TOTAL_STEPS = 5;

export function ProfileSetupScreen({
  profile,
  setProfile,
  onExit,
}: {
  profile: ProfileData;
  setProfile: (updater: (prev: ProfileData) => ProfileData) => void;
  onExit: () => void;
}) {
  const [step, setStep] = useState(0);

  const toggleTag = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      lifestyleTags: prev.lifestyleTags.includes(id)
        ? prev.lifestyleTags.filter((tag) => tag !== id)
        : [...prev.lifestyleTags, id],
    }));
  };

  const strength =
    [profile.bio.trim().length > 0, profile.lifestyleTags.length > 0, profile.videoIntro, profile.employed, profile.socialVerified].filter(
      Boolean,
    ).length * 20;

  const back = () => (step === 0 ? onExit() : setStep((s) => s - 1));
  const next = () => (step === TOTAL_STEPS - 1 ? onExit() : setStep((s) => s + 1));

  if (step === 0) {
    return (
      <WizardShell step={0} totalSteps={TOTAL_STEPS} onBack={onExit} bare footer={null}>
        <div className="wizard-intro">
          <span className="wizard-intro-icon">
            <UserRound size={28} />
          </span>
          <p className="eyebrow">YOUR PROFILE</p>
          <h1>Let’s make people want to meet you</h1>
          <p className="wizard-intro-copy">
            A complete profile gets noticed first — and skips the small talk later. Takes about two minutes, and you can stop
            whenever you want.
          </p>
          <button className="primary-button" onClick={() => setStep(1)}>
            Let’s go
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
        eyebrow="STEP 1 OF 3"
        title="Tell people who you are"
        subtitle="Two or three sentences. No need to sell yourself — just sound like you."
        onBack={back}
        footer={
          <button className="primary-button" onClick={next}>
            Continue
          </button>
        }
      >
        <textarea
          className="wizard-textarea"
          placeholder="I'm a quiet-ish product designer who cooks too much pasta and is always down for a walk by the canal…"
          value={profile.bio}
          maxLength={280}
          onChange={(event) => setProfile((prev) => ({ ...prev, bio: event.target.value }))}
        />
        <span className="wizard-char-count">{profile.bio.length} / 280</span>
        <p className="wizard-section-label">WHAT DESCRIBES YOUR LIFESTYLE?</p>
        <TagPicker options={lifestyleTags} selected={profile.lifestyleTags} onToggle={toggleTag} />
      </WizardShell>
    );
  }

  if (step === 2) {
    return (
      <WizardShell
        step={2}
        totalSteps={TOTAL_STEPS}
        eyebrow="STEP 2 OF 3"
        title="Say hi on camera"
        subtitle="Thirty seconds, no script. A face and a voice build trust faster than any paragraph — this isn't a job interview, just enough to get the vibe."
        onBack={back}
        footer={
          <>
            <button className="primary-button" onClick={next}>
              Continue
            </button>
            {!profile.videoIntro && (
              <button className="wizard-skip" onClick={next}>
                Skip for now
              </button>
            )}
          </>
        }
      >
        {profile.videoIntro ? (
          <div className="video-confirmed">
            <CheckCircle2 size={22} />
            <div>
              <strong>Looks great.</strong>
              <p>Your intro is attached to your profile.</p>
            </div>
            <button className="video-retake" onClick={() => setProfile((prev) => ({ ...prev, videoIntro: false }))}>
              Retake
            </button>
          </div>
        ) : (
          <button className="video-dropzone" onClick={() => setProfile((prev) => ({ ...prev, videoIntro: true }))}>
            <span className="video-dropzone-icon">
              <Video size={22} />
            </span>
            <strong>Record or upload a short video</strong>
            <span>Just you, your room or neighborhood, and a quick hello.</span>
            <span className="video-dropzone-cta">
              <Camera size={14} /> Tap to simulate upload
            </span>
          </button>
        )}
      </WizardShell>
    );
  }

  if (step === 3) {
    return (
      <WizardShell
        step={3}
        totalSteps={TOTAL_STEPS}
        eyebrow="STEP 3 OF 3"
        title="Build a little more trust"
        subtitle="Verified details help your requests get accepted faster. Everything here is optional, and private until you choose to share it."
        onBack={back}
        footer={
          <button className="primary-button" onClick={next}>
            Continue
          </button>
        }
      >
        <button
          className={`wizard-toggle-row ${profile.employed ? 'wizard-toggle-row--on' : ''}`}
          onClick={() => setProfile((prev) => ({ ...prev, employed: !prev.employed }))}
        >
          <span>
            <strong>I’m officially employed</strong>
            <small>Shown to matches as a verified badge, not your employer’s name.</small>
          </span>
          <span className="wizard-switch" />
        </button>

        <div className="wizard-social-row">
          <div>
            <strong>Instagram or LinkedIn</strong>
            <small>One link is enough — it just has to be really you.</small>
          </div>
          <div className="wizard-social-input">
            <input
              type="text"
              placeholder="@yourhandle"
              value={profile.socialHandle}
              onChange={(event) => setProfile((prev) => ({ ...prev, socialHandle: event.target.value, socialVerified: false }))}
            />
            <button
              className="wizard-verify-button"
              disabled={!profile.socialHandle.trim()}
              onClick={() => setProfile((prev) => ({ ...prev, socialVerified: true }))}
            >
              {profile.socialVerified ? <BadgeCheck size={16} /> : 'Verify'}
            </button>
          </div>
        </div>

        <p className="wizard-note">
          <Lock size={13} /> ID verification happens later, right before you move in — no need to upload anything now.
        </p>
      </WizardShell>
    );
  }

  return (
    <WizardShell step={4} totalSteps={TOTAL_STEPS} onBack={back} bare footer={null}>
      <div className="wizard-intro">
        <span className="wizard-intro-icon">
          <CheckCircle2 size={28} />
        </span>
        <p className="eyebrow">ALL SET</p>
        <h1>Your profile is looking good</h1>
        <div className="strength-bar">
          <div className="strength-bar-fill" style={{ width: `${strength}%` }} />
        </div>
        <p className="wizard-intro-copy">
          {strength >= 80
            ? 'Strong profile — you’re ready to send requests that actually get read.'
            : 'Good start. You can always come back and add more from your profile.'}
        </p>
        <button className="primary-button" onClick={onExit}>
          Back to profile
        </button>
      </div>
    </WizardShell>
  );
}
