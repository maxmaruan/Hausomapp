import { matches } from '../data/matches';
import { MatchKind, NavTab } from '../types';
import { BottomNav } from '../components/BottomNav';
import { MatchCard } from '../components/MatchCard';

const filters: { id: MatchKind; label: string }[] = [
  { id: 'landlord', label: 'Landlord' },
  { id: 'tenant', label: 'Tenant' },
  { id: 'roommate', label: 'Roomate' },
];

export function FavoritesScreen({
  activeFilter,
  setActiveFilter,
  likedIds,
  onToggleLike,
  onOpenMatch,
  onNavigate,
}: {
  activeFilter: MatchKind;
  setActiveFilter: (filter: MatchKind) => void;
  likedIds: Set<string>;
  onToggleLike: (id: string) => void;
  onOpenMatch: (id: string) => void;
  onNavigate: (tab: NavTab) => void;
}) {
  const favorites = matches.filter((match) => match.kind === activeFilter && likedIds.has(match.id));

  return (
    <main className="app-shell app-shell--with-nav">
      <section className="screen-content favorites-screen">
        <header className="favorites-header">
          <p className="eyebrow">YOUR</p>
          <h1>Favourite</h1>
        </header>
        <div className="filter-tabs">
          {filters.map(({ id, label }) => (
            <button
              className={activeFilter === id ? 'filter-tab filter-tab--active' : 'filter-tab'}
              onClick={() => setActiveFilter(id)}
              key={id}
            >
              {label}
            </button>
          ))}
        </div>
        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-favorites-icon" />
            <p>No favorites yet</p>
            <small>Tap the heart on a match to save it here.</small>
          </div>
        ) : (
          <div className="feed-list favorites-list">
            {favorites.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                liked
                onLike={() => onToggleLike(match.id)}
                onOpen={() => onOpenMatch(match.id)}
              />
            ))}
          </div>
        )}
      </section>
      <BottomNav active="favorite" onNavigate={onNavigate} />
    </main>
  );
}
