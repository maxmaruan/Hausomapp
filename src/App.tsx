import { useEffect, useState } from 'react';
import { MatchKind, NavTab, ProfileData, RequestData, Screen } from './types';
import { getMatch } from './data/matches';
import { chatThreads as initialChatThreads } from './data/chats';
import { SplashScreen } from './screens/SplashScreen';
import { IntroCarousel } from './screens/IntroCarousel';
import { RoleScreen } from './screens/RoleScreen';
import { MeetScreen } from './screens/MeetScreen';
import { DetailScreen } from './screens/DetailScreen';
import { RequestScreen } from './screens/RequestScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { ChatListScreen } from './screens/ChatListScreen';
import { ChatDetailScreen } from './screens/ChatDetailScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ProfileSetupScreen } from './screens/ProfileSetupScreen';
import { RequestWizardScreen } from './screens/RequestWizardScreen';

const initialProfile: ProfileData = {
  bio: '',
  lifestyleTags: [],
  videoIntro: false,
  employed: false,
  socialHandle: '',
  socialVerified: false,
};

const initialRequest: RequestData = {
  lookingFor: 'room',
  location: 'Berlin',
  budgetMin: 800,
  budgetMax: 1200,
  moveInDate: '',
  duration: 'medium',
  lifestyleTags: [],
  mustHaves: [],
  submitted: false,
};

function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [activeTab, setActiveTab] = useState<NavTab>('meet');
  const [selectedRole, setSelectedRole] = useState(0);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<MatchKind>('landlord');
  const [preloaderStage, setPreloaderStage] = useState<0 | 1>(0);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [chatThreads, setChatThreads] = useState(initialChatThreads);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [requestData, setRequestData] = useState<RequestData>(initialRequest);

  useEffect(() => {
    if (screen !== 'splash') return;
    const delay = preloaderStage === 0 ? 1000 : 2000;
    const timer = window.setTimeout(() => {
      if (preloaderStage === 0) {
        setPreloaderStage(1);
      } else {
        setScreen('intro');
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [preloaderStage, screen]);

  const navigateTab = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'meet') setScreen('meet');
    if (tab === 'favorite') setScreen('favorites');
    if (tab === 'chat') setScreen('chatList');
    if (tab === 'profile') setScreen('profile');
  };

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openMatch = (id: string) => {
    setSelectedMatchId(id);
    setExpanded(false);
    setScreen('detail');
  };

  const sendRequest = () => {
    setActiveTab('chat');
    setScreen('chatList');
  };

  const openThread = (id: string) => {
    setSelectedThreadId(id);
    setScreen('chatDetail');
  };

  const sendMessage = (threadId: string, text: string) => {
    setChatThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              lastMessage: text,
              time: 'Now',
              messages: [...thread.messages, { id: `${threadId}-${thread.messages.length}`, from: 'me', text, time: 'Now' }],
            }
          : thread,
      ),
    );
  };

  if (screen === 'splash') return <SplashScreen stage={preloaderStage} />;
  if (screen === 'intro') return <IntroCarousel onDone={() => setScreen('role')} />;
  if (screen === 'role')
    return <RoleScreen selectedRole={selectedRole} setSelectedRole={setSelectedRole} onContinue={() => setScreen('meet')} />;

  if (screen === 'detail' && selectedMatchId) {
    const match = getMatch(selectedMatchId);
    if (match)
      return (
        <DetailScreen
          match={match}
          liked={likedIds.has(match.id)}
          onToggleLike={() => toggleLike(match.id)}
          expanded={expanded}
          setExpanded={setExpanded}
          onBack={() => setScreen('meet')}
          onRequest={() => setScreen('request')}
          onNavigate={navigateTab}
        />
      );
  }

  if (screen === 'request' && selectedMatchId) {
    const match = getMatch(selectedMatchId);
    if (match) return <RequestScreen match={match} onBack={() => setScreen('detail')} onSend={sendRequest} onNavigate={navigateTab} />;
  }

  if (screen === 'favorites')
    return (
      <FavoritesScreen
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        likedIds={likedIds}
        onToggleLike={toggleLike}
        onOpenMatch={openMatch}
        onNavigate={navigateTab}
      />
    );

  if (screen === 'chatList') return <ChatListScreen threads={chatThreads} onOpenThread={openThread} onNavigate={navigateTab} />;

  if (screen === 'chatDetail' && selectedThreadId) {
    const thread = chatThreads.find((item) => item.id === selectedThreadId);
    if (thread)
      return (
        <ChatDetailScreen thread={thread} onBack={() => setScreen('chatList')} onSendMessage={(text) => sendMessage(thread.id, text)} />
      );
  }

  if (screen === 'profile')
    return <ProfileScreen onNavigate={navigateTab} onOpenProfileSetup={() => setScreen('myProfile')} onOpenRequest={() => setScreen('myRequest')} />;

  if (screen === 'myProfile')
    return <ProfileSetupScreen profile={profile} setProfile={setProfile} onExit={() => setScreen('profile')} />;

  if (screen === 'myRequest')
    return <RequestWizardScreen request={requestData} setRequest={setRequestData} onExit={() => setScreen('profile')} />;

  return (
    <MeetScreen
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
      activeTab={activeTab}
      likedIds={likedIds}
      onToggleLike={toggleLike}
      onOpenMatch={openMatch}
      onNavigate={navigateTab}
    />
  );
}

export default App;
