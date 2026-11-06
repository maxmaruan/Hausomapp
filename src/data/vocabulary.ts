import {
  BadgeCheck,
  Briefcase,
  Cigarette,
  Laptop,
  Leaf,
  LucideIcon,
  Moon,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Sunrise,
  Users,
  Volume1,
} from 'lucide-react';

export interface VocabTag {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const lifestyleTags: VocabTag[] = [
  { id: 'early-bird', label: 'Early bird', icon: Sunrise },
  { id: 'night-owl', label: 'Night owl', icon: Moon },
  { id: 'remote-worker', label: 'Remote worker', icon: Laptop },
  { id: 'pets-friendly', label: 'Pets friendly', icon: PawPrint },
  { id: 'no-smoking', label: 'No smoking', icon: Cigarette },
  { id: 'social', label: 'Social', icon: Users },
  { id: 'quiet', label: 'Quiet household', icon: Volume1 },
  { id: 'vegan', label: 'Vegan', icon: Leaf },
  { id: 'tidy', label: 'Tidy', icon: Sparkles },
];

export const mustHaveTags: VocabTag[] = [
  { id: 'verified-employment', label: 'Verified employment', icon: Briefcase },
  { id: 'social-confirmed', label: 'Social profiles confirmed', icon: BadgeCheck },
  { id: 'id-verified', label: 'ID verified tenants only', icon: ShieldCheck },
  { id: 'no-smokers', label: 'No smokers', icon: Cigarette },
  { id: 'pets-allowed', label: 'Pets allowed', icon: PawPrint },
  { id: 'quiet-household', label: 'Quiet household', icon: Volume1 },
];
