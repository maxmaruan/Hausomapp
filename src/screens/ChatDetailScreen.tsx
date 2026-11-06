import { useState } from 'react';
import { ArrowLeft, MoreHorizontal, Send } from 'lucide-react';
import { ChatThread } from '../types';
import { getMatch } from '../data/matches';

export function ChatDetailScreen({
  thread,
  onBack,
  onSendMessage,
}: {
  thread: ChatThread;
  onBack: () => void;
  onSendMessage: (text: string) => void;
}) {
  const [draft, setDraft] = useState('');
  const match = getMatch(thread.matchId);
  if (!match) return null;

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    onSendMessage(text);
    setDraft('');
  };

  return (
    <main className="app-shell chat-detail-screen">
      <header className="chat-detail-header">
        <button className="back-link" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <div className="avatar">{match.name[0]}</div>
        <div className="chat-detail-identity">
          <strong>{match.name}</strong>
          <span>Online</span>
        </div>
        <button className="circle-button circle-button--light" aria-label="More options">
          <MoreHorizontal size={18} />
        </button>
      </header>
      <div className="chat-messages">
        {thread.messages.map((message) => (
          <div key={message.id} className={`chat-bubble-row ${message.from === 'me' ? 'chat-bubble-row--me' : ''}`}>
            <div className={`chat-bubble ${message.from === 'me' ? 'chat-bubble--me' : 'chat-bubble--them'}`}>
              <p>{message.text}</p>
              <span>{message.time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input-bar">
        <input
          type="text"
          placeholder="Type a message..."
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && submit()}
        />
        <button className="chat-send-button" onClick={submit} aria-label="Send message">
          <Send size={16} />
        </button>
      </div>
    </main>
  );
}
