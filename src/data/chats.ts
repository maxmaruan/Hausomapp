import { ChatThread } from '../types';

export const chatThreads: ChatThread[] = [
  {
    id: 'thread-marie',
    matchId: 'marie',
    lastMessage: "Hi Marie! I'm moving to Berlin for two months and your place feels like a great fit.",
    time: '10:42',
    unread: true,
    messages: [
      {
        id: 'm1',
        from: 'me',
        text: "Hi Marie! I'm moving to Berlin for two months and your place feels like a great fit. I'm tidy, considerate and would love to learn more.",
        time: '10:40',
      },
      {
        id: 'm2',
        from: 'them',
        text: 'Hey! Really like your profile and the apartment. Would you be up for a video call this week to chat more?',
        time: '10:41',
      },
      {
        id: 'm3',
        from: 'me',
        text: "Hi Marie! That sounds great, I'm free on Thursday. Let me know what works for you.",
        time: '10:42',
      },
      {
        id: 'm4',
        from: 'them',
        text: "Perfect! I'll send you a link later today. Looking forward to it.",
        time: '10:43',
      },
    ],
  },
  {
    id: 'thread-lena',
    matchId: 'lena',
    lastMessage: 'Sounds great — let me check my calendar and get back to you.',
    time: 'Yesterday',
    unread: false,
    messages: [
      {
        id: 'l1',
        from: 'me',
        text: 'Hi Lena, your place in Prenzlauer Berg looks perfect for my stay.',
        time: '09:12',
      },
      {
        id: 'l2',
        from: 'them',
        text: 'Sounds great — let me check my calendar and get back to you.',
        time: '09:30',
      },
    ],
  },
  {
    id: 'thread-adam',
    matchId: 'adam',
    lastMessage: 'Looking forward to meeting up and seeing the place together!',
    time: 'Mon',
    unread: false,
    messages: [
      {
        id: 'a1',
        from: 'them',
        text: "Hey! I saw you're also looking in Neukölln — want to compare notes?",
        time: '18:02',
      },
      {
        id: 'a2',
        from: 'me',
        text: 'Looking forward to meeting up and seeing the place together!',
        time: '18:20',
      },
    ],
  },
];
