import { Heart, Home, MessageCircle, UserRound } from 'lucide-react';
import { NavTab } from '../types';
import { palette } from '../theme';

const items: { id: NavTab; label: string; icon: typeof Home }[] = [
  { id: 'meet', label: 'Meet', icon: Home },
  { id: 'favorite', label: 'Favorite', icon: Heart },
  { id: 'chat', label: 'Chat', icon: MessageCircle },
  { id: 'profile', label: 'Profile', icon: UserRound },
];

export function BottomNav({ active, onNavigate }: { active: NavTab; onNavigate: (tab: NavTab) => void }) {
  return (
    <nav className="bottom-nav">
      {items.map(({ id, label, icon: Icon }) => (
        <button className={`nav-item ${active === id ? 'nav-item--active' : ''}`} key={id} onClick={() => onNavigate(id)}>
          <Icon size={21} strokeWidth={active === id ? 2.8 : 1.8} fill={active === id && id !== 'meet' ? palette.white : 'none'} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
