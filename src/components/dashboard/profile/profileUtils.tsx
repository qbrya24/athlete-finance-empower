
import { PiggyBank, TrendingUp, Wallet, User } from 'lucide-react';

export interface ProfileTypeInfo {
  type: string;
  score: number;
  description: string;
  iconType: 'PiggyBank' | 'Wallet' | 'TrendingUp' | 'User';
  traits: string[];
  color: string;
}

export interface ProfileData {
  primary_investor_profile: string | null;
  secondary_investor_profile: string | null;
  saver_score: number | null;
  spender_score: number | null;
  investor_score: number | null;
  financial_literacy_score: number | null;
}

export const getProfileTypeInfo = (type: string | null, profileData?: ProfileData | null): ProfileTypeInfo => {
  switch (type) {
    case 'Saver':
      return {
        type: 'Saver',
        score: profileData?.saver_score || 0,
        description: 'You prioritize financial security and are careful with your money.',
        iconType: 'PiggyBank',
        traits: ['Risk-averse', 'Security-focused', 'Disciplined'],
        color: 'bg-green-500/80'
      };
    case 'Spender':
      return {
        type: 'Spender',
        score: profileData?.spender_score || 0,
        description: 'You enjoy using your money for experiences and possessions.',
        iconType: 'Wallet',
        traits: ['Experience-oriented', 'Present-focused', 'Spontaneous'],
        color: 'bg-gold/80'
      };
    case 'Investor':
      return {
        type: 'Investor',
        score: profileData?.investor_score || 0,
        description: 'You focus on growing your wealth through investments.',
        iconType: 'TrendingUp',
        traits: ['Growth-minded', 'Strategic', 'Future-oriented'],
        color: 'bg-blue-500/80'
      };
    default:
      return {
        type: 'Unknown',
        score: 0,
        description: 'Your financial profile could not be determined.',
        iconType: 'User',
        traits: ['Complete the assessment to learn more'],
        color: 'bg-gray-500'
      };
  }
};

export const getLiteracyScoreText = (score: number | null | undefined): { text: string, color: string } => {
  if (!score) return { text: 'Not assessed', color: 'text-gray-500' };
  
  if (score >= 80) return { text: 'Excellent', color: 'text-green-500' };
  if (score >= 60) return { text: 'Good', color: 'text-yellow-600' };
  return { text: 'Needs improvement', color: 'text-red-400' };
};
