import { matches } from '../data/matches';
import { MatchKind, NavTab } from '../types';
import { BottomNav } from '../components/BottomNav';
import { MatchCard } from '../components/MatchCard';

const filters: { id: MatchKind; label: string }[] = [
  { id: 'landlord', label: 'Landlord' },
  { id: 'tenant', label: 'Tenant' },
  { id: 'roommate', label: 'Roomate' },
];

export function MeetScreen({
  activeFilter,
  setActiveFilter,
  activeTab,
  likedIds,
  onToggleLike,
  onOpenMatch,
  onNavigate,
}: {
  activeFilter: MatchKind;
  setActiveFilter: (filter: MatchKind) => void;
  activeTab: NavTab;
  likedIds: Set<string>;
  onToggleLike: (id: string) => void;
  onOpenMatch: (id: string) => void;
  onNavigate: (tab: NavTab) => void;
}) {
  const feed = matches.filter((match) => match.kind === activeFilter);

  return (
    <main className="app-shell app-shell--with-nav">
      <section className="screen-content meet-screen">
        <header className="meet-header">
          <h1>Meet</h1>
          <div className="meet-subrow">
            <span className="meet-subrow-label">Your best</span>
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
          </div>
        </header>
        <div className="chip-row">
          {['Matching your request', 'Top Landlords', 'In your Hood'].map((chip, index) => (
            <button className={index === 0 ? 'chip chip--selected' : 'chip'} key={chip}>
              {chip}
            </button>
          ))}
        </div>
        <div className="feed-list">
          {feed.length === 0 && <p className="empty-state">No matches here yet — check back soon.</p>}
          {feed.map((match, index) => (
            <MatchCard
              key={match.id}
              match={match}
              highlighted={index === 0}
              liked={likedIds.has(match.id)}
              onLike={() => onToggleLike(match.id)}
              onOpen={() => onOpenMatch(match.id)}
            />
          ))}
        </div>
      </section>
      <BottomNav active={activeTab} onNavigate={onNavigate} />
    </main>
  );
}
