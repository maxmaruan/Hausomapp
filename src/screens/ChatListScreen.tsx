import { ChatThread, NavTab } from '../types';
import { getMatch } from '../data/matches';
import { BottomNav } from '../components/BottomNav';

export function ChatListScreen({
  threads,
  onOpenThread,
  onNavigate,
}: {
  threads: ChatThread[];
  onOpenThread: (id: string) => void;
  onNavigate: (tab: NavTab) => void;
}) {
  return (
    <main className="app-shell app-shell--with-nav">
      <section className="screen-content chat-list-screen">
        <header className="chat-list-header">
          <p className="eyebrow">HAUSOM</p>
          <h1>Chat</h1>
        </header>
        <div className="chat-thread-list">
          {threads.map((thread) => {
            const match = getMatch(thread.matchId);
            if (!match) return null;
            return (
              <button className="chat-thread-item" key={thread.id} onClick={() => onOpenThread(thread.id)}>
                <div className="avatar">{match.name[0]}</div>
                <div className="chat-thread-body">
                  <div className="chat-thread-top">
                    <strong>{match.name}</strong>
                    <span className="chat-thread-time">{thread.time}</span>
                  </div>
                  <p className="chat-thread-location">{match.location}</p>
                  <p className="chat-thread-preview">{thread.lastMessage}</p>
                </div>
                {thread.unread && <span className="unread-dot" />}
              </button>
            );
          })}
        </div>
      </section>
      <BottomNav active="chat" onNavigate={onNavigate} />
    </main>
  );
}
