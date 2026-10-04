import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Heart,
  Home,
  MessageCircle,
  MoreHorizontal,
  UserRound,
} from 'lucide-react';

type Screen = 'splash' | 'intro' | 'role' | 'meet' | 'detail' | 'request';
type NavTab = 'meet' | 'favorite' | 'chat' | 'profile';

const palette = {
  cream: '#FFF4F2',
  mint: '#E3EEE9',
  red: '#E92E1E',
  green: '#123C28',
  white: '#FFFFFF',
};

const apartmentImages = [
  'https://images.pexels.com/photos/7546319/pexels-photo-7546319.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/26571207/pexels-photo-26571207.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/4078615/pexels-photo-4078615.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/33197280/pexels-photo-33197280.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/38645242/pexels-photo-38645242.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const matchTags = ['Similar budget', 'Pets friendly', 'Aligned Living Habits', 'Verified profiles', 'Date matched', 'Smoking tolerant'];
const preloaderImages = [
  '/assets/preloader/iPhone_13_&_14_-_10.jpg',
  '/assets/preloader/iPhone_13_&_14_-_7.jpg',
  '/assets/preloader/iPhone_13_&_14_-_4.jpg',
];

function LogoWord() {
  return <span className="logo-word">HAUSOM</span>;
}

function BottomNav({ active, onNavigate }: { active: NavTab; onNavigate: (tab: NavTab) => void }) {
  const items: { id: NavTab; label: string; icon: typeof Home }[] = [
    { id: 'meet', label: 'Meet', icon: Home },
    { id: 'favorite', label: 'Favorite', icon: Heart },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: UserRound },
  ];
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

function MatchTags({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`tag-list ${compact ? 'tag-list--compact' : ''}`}>
      {matchTags.map((tag) => (
        <span className="tag" key={tag}><Check size={11} strokeWidth={3} />{tag}</span>
      ))}
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [activeTab, setActiveTab] = useState<NavTab>('meet');
  const [selectedRole, setSelectedRole] = useState(0);
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Landlord');
  const [preloaderStage, setPreloaderStage] = useState(0);

  useEffect(() => {
    if (screen !== 'splash') return;
    const timer = window.setTimeout(() => {
      if (preloaderStage === preloaderImages.length - 1) {
        setScreen('intro');
      } else {
        setPreloaderStage((stage) => stage + 1);
      }
    }, 900);
    return () => window.clearTimeout(timer);
  }, [preloaderStage, screen]);

  const navigateTab = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'meet') setScreen('meet');
  };

  if (screen === 'splash') return <main className="app-shell splash-screen"><img key={preloaderImages[preloaderStage]} className="preloader-image" src={preloaderImages[preloaderStage]} alt="Hausom loading" /></main>;
  if (screen === 'intro') return <IntroScreen onStart={() => setScreen('role')} />;
  if (screen === 'role') return <RoleScreen selectedRole={selectedRole} setSelectedRole={setSelectedRole} onContinue={() => setScreen('meet')} />;
  if (screen === 'detail') return <DetailScreen liked={liked} setLiked={setLiked} expanded={expanded} setExpanded={setExpanded} onBack={() => setScreen('meet')} onRequest={() => setScreen('request')} onNavigate={navigateTab} />;
  if (screen === 'request') return <RequestScreen onBack={() => setScreen('detail')} onNavigate={navigateTab} />;

  return (
    <main className="app-shell app-shell--with-nav">
      <section className="screen-content meet-screen">
        <header className="meet-header">
          <div><p className="eyebrow">HAUSOM / BERLIN</p><h1>Meet</h1><p className="subheading">Your best <em>matches</em></p></div>
          <button className="circle-button circle-button--light" aria-label="More options"><MoreHorizontal size={20} /></button>
        </header>
        <div className="filter-tabs">
          {['Landlord', 'Tenant', 'Roommate'].map((filter) => <button className={activeFilter === filter ? 'filter-tab filter-tab--active' : 'filter-tab'} onClick={() => setActiveFilter(filter)} key={filter}>{filter}</button>)}
        </div>
        <div className="chip-row">
          {['Matching your request', 'Top Landlords', 'In your Hood'].map((chip, index) => <button className={index === 0 ? 'chip chip--selected' : 'chip'} key={chip}>{chip}{index === 0 && <ChevronDown size={14} />}</button>)}
        </div>
        <div className="feed-list">
          {apartmentImages.map((image, index) => <MatchCard key={image} image={image} index={index} liked={liked && index === 0} onLike={() => setLiked(!liked)} onOpen={() => setScreen('detail')} />)}
        </div>
      </section>
      <BottomNav active={activeTab} onNavigate={navigateTab} />
    </main>
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return <main className="app-shell intro-screen"><div className="intro-art"><div className="art-shape art-shape--one" /><div className="art-shape art-shape--two" /><div className="art-window" /><div className="art-person" /></div><div className="intro-copy"><p className="eyebrow">WELCOME TO HAUSOM</p><h1>Renting, but<br /><em>human.</em></h1><p>Hausom is a community based App, aiming to change renting process from boring and hopeless to joyful and inspiring.</p><p className="intro-quote">We are building the shortest path between two people looking for the same thing: a home and someone they can trust in it.</p><button className="primary-button" onClick={onStart}>GET STARTED <ArrowRight size={17} /></button></div></main>;
}

function RoleScreen({ selectedRole, setSelectedRole, onContinue }: { selectedRole: number; setSelectedRole: (role: number) => void; onContinue: () => void }) {
  const roles = [['I’m looking for a home', 'Find a landlord and a place that feels right'], ['I have a home to share', 'Find a tenant who feels like a good fit'], ['I’m looking for a roommate', 'Connect with people you’ll enjoy living with']];
  return <main className="app-shell role-screen"><header className="simple-header"><button className="text-button"><ArrowLeft size={17} /> Back</button><LogoWord /></header><div className="role-copy"><p className="eyebrow">LET’S GET STARTED</p><h1>What brings<br />you to Hausom?</h1><p>Choose the role that fits you best.<br />You can change this later.</p></div><div className="role-options">{roles.map(([title, subtitle], index) => <button className={`role-card ${selectedRole === index ? 'role-card--selected' : ''}`} key={title} onClick={() => setSelectedRole(index)}><span className="radio-dot">{selectedRole === index && <span />}</span><span><strong>{title}</strong><small>{subtitle}</small></span><ChevronRight size={17} /></button>)}</div><div className="role-footer"><button className="primary-button" onClick={onContinue}>CONTINUE <ArrowRight size={17} /></button><p>Already have an account? <button>Sign in</button></p></div></main>;
}

function MatchCard({ image, index, liked, onLike, onOpen }: { image: string; index: number; liked: boolean; onLike: () => void; onOpen: () => void }) {
  return <article className="match-card"><div className="photo-wrap"><img src={image} alt="Bright apartment interior" /><div className="photo-label">{index === 0 ? 'NEW MATCH' : 'FOR YOU'}</div><button className={`heart-button ${liked ? 'heart-button--liked' : ''}`} onClick={onLike} aria-label="Favorite listing"><Heart size={19} fill={liked ? palette.red : 'none'} /></button><div className="avatar avatar--overlap">M</div></div><div className="card-body"><div className="card-heading"><div><h2>Marie, 44</h2><p>Offering flat in <strong>Berlin, Kreuzberg</strong></p></div><span className="verified-mark"><Check size={12} /></span></div><p className="card-date">May 1 – June 30, 2026 <span>·</span> €1000 / month</p><MatchTags compact /><div className="card-bottom"><strong className="match-score">90% MATCH</strong><button className="details-button" onClick={onOpen}>More details <span className="arrow-circle"><ArrowUpRight size={14} /></span></button></div></div></article>;
}

function DetailScreen({ liked, setLiked, expanded, setExpanded, onBack, onRequest, onNavigate }: { liked: boolean; setLiked: (value: boolean) => void; expanded: boolean; setExpanded: (value: boolean) => void; onBack: () => void; onRequest: () => void; onNavigate: (tab: NavTab) => void }) {
  return <main className="app-shell app-shell--with-nav"><section className="screen-content detail-screen"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Back to offers</button><div className="detail-hero"><img src={apartmentImages[0]} alt="Flat in Berlin, Kreuzberg" /><div className="detail-person"><div className="avatar">M</div><div><strong>Marie</strong><span>90% match</span></div></div></div><p className="eyebrow detail-eyebrow">BERLIN · KREUZBERG</p><h1>Flat in Berlin,<br />Kreuzberg</h1><p className="detail-meta">Marie · 44 y.o. · <strong>€1000 / Month</strong></p><p className="detail-description">Hausom is the shortest path between two people looking for the same thing: a home and someone they can trust in it.</p>{expanded && <p className="expanded-copy">A bright, calm home in the heart of Kreuzberg, ready for someone considerate and curious. The flat is close to cafés, parks, and everything you need for an easy stay.</p>}<button className="expand-button" onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide description' : 'Full description'} <ChevronDown size={15} className={expanded ? 'rotate-icon' : ''} /></button><div className="detail-divider" /><p className="section-label">WHY YOU MATCH</p><MatchTags /><div className="landlord-card"><div className="avatar">M</div><div><strong>Marie</strong><p>Authorized landlord</p><small>English / German · Owner</small></div><ArrowUpRight size={17} /></div><blockquote>“Hausom is the shortest path between two people looking for the same thing.”</blockquote><div className="detail-actions"><strong className="match-score">90% MATCH</strong><button className="primary-button" onClick={onRequest}>Send a request <ArrowRight size={16} /></button><button className={`secondary-button ${liked ? 'secondary-button--liked' : ''}`} onClick={() => setLiked(!liked)}>{liked ? 'Saved to favorites' : 'Add to favorites'} <Heart size={16} fill={liked ? palette.red : 'none'} /></button></div></section><BottomNav active="meet" onNavigate={onNavigate} /></main>;
}

function RequestScreen({ onBack, onNavigate }: { onBack: () => void; onNavigate: (tab: NavTab) => void }) {
  return <main className="app-shell app-shell--with-nav"><section className="screen-content request-screen"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Back</button><div className="request-heading"><div className="avatar avatar--large">M</div><div><p className="eyebrow">INTRODUCE YOURSELF TO</p><h1>Marie</h1><p>Berlin, Kreuzberg <span className="match-pill">90% match</span></p></div></div><div className="request-form"><label>YOUR DATES</label><button className="date-field">May 1 – June 30, 2026 <ChevronDown size={17} /></button><label>YOUR MESSAGE</label><div className="message-field"><textarea defaultValue="Hi Marie! I'm moving to Berlin for two months and your place feels like a great fit. I'm tidy, considerate and would love to learn more." maxLength={500} /><span>96 / 500</span></div><p className="request-note">Marie will receive your profile and request details. You can continue the conversation in Chat.</p><button className="primary-button request-submit">Send request <ArrowRight size={17} /></button></div></section><BottomNav active="chat" onNavigate={onNavigate} /></main>;
}

export default App;
