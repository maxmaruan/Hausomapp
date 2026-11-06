import { Heart, Instagram, Linkedin } from 'lucide-react';
import { Match, NavTab } from '../types';
import { palette } from '../theme';
import { BottomNav } from '../components/BottomNav';
import { MatchTags } from '../components/MatchTags';

export function DetailScreen({
  match,
  liked,
  onToggleLike,
  expanded,
  setExpanded,
  onBack,
  onRequest,
  onNavigate,
}: {
  match: Match;
  liked: boolean;
  onToggleLike: () => void;
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  onBack: () => void;
  onRequest: () => void;
  onNavigate: (tab: NavTab) => void;
}) {
  const isListing = match.kind === 'landlord';
  const [headline, intro] = (match.about ?? '').split('\n');

  return (
    <main className="app-shell app-shell--with-nav">
      <section className="screen-content detail-screen">
        <button className="back-link" onClick={onBack}>
          <img src="/figma/icons/arrow-circle-left.svg" alt="" width={24} height={24} />
          Back to offers
        </button>

        <div className="detail-gallery">
          <div className="detail-gallery-item">
            <img src={match.image} alt={isListing ? `Flat in ${match.location}` : `${match.name}'s profile photo`} />
          </div>
          <div className="detail-gallery-item">
            <img src={match.image} alt="" />
          </div>
        </div>

        <h1 className="detail-title">{isListing ? `Flat in ${match.location}` : `${match.name}, ${match.age} y.o.`}</h1>
        {!isListing && <p className="detail-location">{match.location}</p>}
        <div className="detail-meta-row">
          <span>
            <img src="/figma/icons/calendar.svg" alt="" width={24} height={24} /> {match.dates}
          </span>
          <span>
            <img src="/figma/icons/coins-hand-24.svg" alt="" width={24} height={24} /> {match.price}
          </span>
        </div>

        {isListing && (
          <>
            <p className="detail-description">{match.about}</p>
            <button className="expand-button" onClick={() => setExpanded(!expanded)}>
              <img
                src="/figma/icons/chevron-left.svg"
                alt=""
                width={18}
                height={18}
                className={expanded ? '' : 'rotate-icon'}
              />
              {expanded ? 'Hide description' : 'Full description'}
            </button>
            {expanded && (
              <p className="expanded-copy">
                A bright, calm home ready for someone considerate and curious. Close to cafés, parks, and everything you need for an
                easy stay.
              </p>
            )}
          </>
        )}

        {!isListing && match.quote && <blockquote>“{match.quote}”</blockquote>}

        {isListing ? (
          <div className="landlord-card">
            <img className="landlord-avatar" src={match.avatar} alt={`${match.name}'s avatar`} />
            <div className="landlord-card-top">
              <p className="landlord-label">
                <img src="/figma/icons/fingerprint-03.svg" alt="" width={18} height={18} /> Authorised landlord
              </p>
              <strong>{match.name}</strong>
              <div className="landlord-meta">
                <span>{match.age} y.o.</span>
                <span>{match.languages}</span>
                <span>Owner</span>
              </div>
            </div>
            {match.quote && <p className="landlord-quote">“{match.quote}”</p>}
          </div>
        ) : (
          headline &&
          intro && (
            <p className="detail-intro">
              {headline}
              <br />
              {intro}
            </p>
          )
        )}

        <strong className="match-score match-score--inline">
          <img src="/figma/icons/fire-dark.svg" alt="" width={24} height={24} /> {match.matchScore}% Match
        </strong>

        <MatchTags tags={match.tags} tone="white" />

        {!isListing && match.social && (
          <div className="social-row">
            <button className="social-button" aria-label="Instagram">
              <Instagram size={16} />
            </button>
            <button className="social-button" aria-label="LinkedIn">
              <Linkedin size={16} />
            </button>
          </div>
        )}
      </section>

      <div className="detail-actions">
        <button className="primary-button" onClick={onRequest}>
          Send a request
          <img src="/figma/icons/message-chat-square.svg" alt="" width={24} height={24} />
        </button>
        <button className={`secondary-button ${liked ? 'secondary-button--liked' : ''}`} onClick={onToggleLike}>
          Add to favorites
          {liked ? <Heart size={20} fill={palette.red} /> : <img src="/figma/icons/heart-outline.svg" alt="" width={24} height={24} />}
        </button>
      </div>

      <BottomNav active="meet" onNavigate={onNavigate} />
    </main>
  );
}
