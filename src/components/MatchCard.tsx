import { Match } from '../types';
import { MatchTags } from './MatchTags';

export function MatchCard({
  match,
  highlighted = false,
  liked,
  onLike,
  onOpen,
}: {
  match: Match;
  highlighted?: boolean;
  liked: boolean;
  onLike: () => void;
  onOpen: () => void;
}) {
  const hasAvatar = match.kind === 'landlord';

  return (
    <article className={`match-card ${hasAvatar ? 'match-card--listing' : 'match-card--person'}`}>
      {hasAvatar && <img className="card-avatar" src={match.avatar} alt={`${match.name}'s avatar`} />}
      <button className="heart-button" onClick={onLike} aria-label="Favorite listing">
        <img src={liked ? '/figma/icons/heart-filled.svg' : '/figma/icons/heart.svg'} alt="" width={24} height={24} />
      </button>
      <div className="photo-wrap" onClick={onOpen} role="button" tabIndex={0}>
        <img
          className="card-photo"
          src={match.image}
          alt={match.kind === 'landlord' ? 'Bright apartment interior' : `${match.name}'s profile photo`}
        />
      </div>
      <div className="card-bg" />
      <h2 className="card-name">{match.name}</h2>
      <p className="card-age">{match.age} y.o.</p>
      <p className="card-location">
        {match.kind === 'landlord' ? 'Offering flat in ' : 'Looking for a flat in '}
        {match.location}
      </p>
      <p className="card-date">{match.dates}</p>
      <MatchTags tags={match.tags} compact />
      <strong className={`match-score ${highlighted ? 'match-score--highlight' : ''}`}>
        <img src={highlighted ? '/figma/icons/fire.svg' : '/figma/icons/fire-dark.svg'} alt="" width={24} height={24} />
        {match.matchScore}% Match
      </strong>
      <button className="details-button" onClick={onOpen}>
        More details
        <img src="/figma/icons/arrow-circle-broken-right.svg" alt="" width={24} height={24} />
      </button>
    </article>
  );
}
