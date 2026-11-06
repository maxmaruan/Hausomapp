import { useState } from 'react';
import { Match, NavTab } from '../types';
import { BottomNav } from '../components/BottomNav';

export function RequestScreen({
  match,
  onBack,
  onSend,
  onNavigate,
}: {
  match: Match;
  onBack: () => void;
  onSend: (message: string) => void;
  onNavigate: (tab: NavTab) => void;
}) {
  const defaultMessage = `Hi ${match.name}! I'm moving to Berlin for two months and your place feels like a great fit. I'm tidy, considerate and would love to learn more.`;
  const [message, setMessage] = useState(defaultMessage);

  return (
    <main className="app-shell app-shell--with-nav">
      <section className="screen-content request-screen">
        <button className="back-link" onClick={onBack}>
          <img src="figma/icons/arrow-left-circle.svg" alt="" width={24} height={24} />
          Back to listing
        </button>

        <h1 className="request-title">Introduce yourself to {match.name}</h1>

        <div className="request-recipient">
          <img className="request-recipient-photo" src={match.avatar} alt={`${match.name}'s avatar`} />
          <div className="request-recipient-info">
            <strong>{match.name}</strong>
            <p>{match.kind === 'landlord' ? `Flat in ${match.location}` : match.location}</p>
          </div>
          <span className="request-match-pill">{match.matchScore}% match</span>
        </div>

        <div className="request-form">
          <label>Preferred dates</label>
          <button className="request-input">
            <img src="figma/icons/calendar-request.svg" alt="" width={20} height={20} />
            <span>{match.dates}</span>
            <img src="figma/icons/chevron-down.svg" alt="" width={14} height={14} />
          </button>

          <label>Your message</label>
          <div className="request-message-input">
            <textarea value={message} maxLength={500} onChange={(event) => setMessage(event.target.value)} />
            <span>{message.length} / 500</span>
          </div>

          <div className="request-privacy-note">
            <img src="figma/icons/shield-check.svg" alt="" width={18} height={18} />
            <p>{match.name} will receive your profile and request details. You can continue the conversation in Chat.</p>
          </div>
        </div>

        <button className="request-send-button" onClick={() => onSend(message)}>
          Send request
          <img src="figma/icons/message-chat-square.svg" alt="" width={24} height={24} />
        </button>
      </section>
      <BottomNav active="chat" onNavigate={onNavigate} />
    </main>
  );
}
