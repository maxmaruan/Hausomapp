export type Screen =
  | 'splash'
  | 'intro'
  | 'problem'
  | 'solution'
  | 'role'
  | 'meet'
  | 'detail'
  | 'request'
  | 'favorites'
  | 'chatList'
  | 'chatDetail'
  | 'profile'
  | 'myProfile'
  | 'myRequest';

export type NavTab = 'meet' | 'favorite' | 'chat' | 'profile';

export type MatchKind = 'landlord' | 'tenant' | 'roommate';

export type LookingFor = 'room' | 'apartment' | 'entire-home';
export type RequestDuration = 'short' | 'medium' | 'long' | 'any';

export interface ProfileData {
  bio: string;
  lifestyleTags: string[];
  videoIntro: boolean;
  employed: boolean;
  socialHandle: string;
  socialVerified: boolean;
}

export interface RequestData {
  lookingFor: LookingFor;
  location: string;
  budgetMin: number;
  budgetMax: number;
  moveInDate: string;
  duration: RequestDuration;
  lifestyleTags: string[];
  mustHaves: string[];
  submitted: boolean;
}

export interface Match {
  id: string;
  kind: MatchKind;
  name: string;
  age: number;
  image: string;
  avatar: string;
  location: string;
  dates: string;
  price: string;
  tags: string[];
  matchScore: number;
  languages?: string;
  quote?: string;
  about?: string;
  social?: boolean;
}

export interface ChatMessage {
  id: string;
  from: 'me' | 'them';
  text: string;
  time: string;
}

export interface ChatThread {
  id: string;
  matchId: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  messages: ChatMessage[];
}
