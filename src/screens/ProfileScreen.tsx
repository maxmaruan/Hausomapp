import { useState } from 'react';
import { ChevronRight, CreditCard, HelpCircle, LogOut, Settings, Sparkles, UserRound } from 'lucide-react';
import { NavTab } from '../types';
import { BottomNav } from '../components/BottomNav';

export function ProfileScreen({
  onNavigate,
  onOpenProfileSetup,
  onOpenRequest,
}: {
  onNavigate: (tab: NavTab) => void;
  onOpenProfileSetup: () => void;
  onOpenRequest: () => void;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <main className="app-shell app-shell--with-nav">
      <section className="screen-content profile-screen">
        <header className="profile-header">
          <div className="avatar avatar--large">M</div>
          <div>
            <h1>Marie</h1>
            <p>@marie_berlin</p>
          </div>
          <button className="profile-settings-button" onClick={() => setSettingsOpen(true)} aria-label="Settings">
            <Settings size={18} />
          </button>
        </header>

        <div className="profile-actions">
          <button className="profile-action-card profile-action-card--primary" onClick={onOpenRequest}>
            <span className="profile-action-icon">
              <Sparkles size={22} />
            </span>
            <span className="profile-action-text">
              <strong>Create request</strong>
              <small>Tell us what you’re looking for — matching starts here</small>
            </span>
            <ChevronRight size={20} />
          </button>

          <button className="profile-action-card" onClick={onOpenProfileSetup}>
            <span className="profile-action-icon">
              <UserRound size={22} />
            </span>
            <span className="profile-action-text">
              <strong>Work on my profile</strong>
              <small>Stand out in about 2 minutes</small>
            </span>
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {settingsOpen && (
        <>
          <button className="settings-overlay" onClick={() => setSettingsOpen(false)} aria-label="Close settings" />
          <div className="settings-sheet">
            <button className="settings-sheet-item">
              <Settings size={16} /> Settings
            </button>
            <button className="settings-sheet-item">
              <CreditCard size={16} /> Subscription
            </button>
            <button className="settings-sheet-item">
              <HelpCircle size={16} /> Help & support
            </button>
            <div className="settings-sheet-divider" />
            <button className="settings-sheet-item settings-sheet-item--danger">
              <LogOut size={16} /> Log out
            </button>
          </div>
        </>
      )}

      <BottomNav active="profile" onNavigate={onNavigate} />
    </main>
  );
}
