import { PurchasePlan } from '../types';

export const GEM_PACKS: PurchasePlan[] = [
  {
    id: 'gems-100',
    name: '100 Gems',
    type: 'gems',
    amount: 100,
    priceUsd: 1.99,
    features: [
      'Refill streak freeze shields',
      'Unlock accelerated diagnostic tests',
      'Instant lesson boost'
    ],
  },
  {
    id: 'gems-500',
    name: '500 Gems',
    type: 'gems',
    amount: 500,
    priceUsd: 3.99,
    badge: 'Popular Choice',
    features: [
      '5x Streak Protection shields',
      'Access to Grand Arena challenge wagers',
      'Unlock custom neural soundscapes'
    ],
  },
  {
    id: 'gems-2000',
    name: '2,000 Gems',
    type: 'gems',
    amount: 2000,
    priceUsd: 9.99,
    badge: 'Best Value',
    features: [
      'Unlimited streak recovery for 30 days',
      'VIP Polyglot badge & custom accent morphing',
      'Full access to all Arena bonus challenges'
    ],
  },
];

export const SUBSCRIPTION_PLANS: PurchasePlan[] = [
  {
    id: 'pro-monthly',
    name: 'Pro Monthly',
    type: 'subscription',
    duration: '1 Month',
    priceUsd: 4.99,
    features: [
      'Unlimited AI Scenario Chat turns',
      'Advanced 85% Strict Phonetic Formant Analysis',
      'Grammar Surgery Module (A3–C3 unlock)',
      'Zero Ads & Unlimited Streak Freeze'
    ],
  },
  {
    id: 'pro-6month',
    name: 'Pro 6-Month Pass',
    type: 'subscription',
    duration: '6 Months',
    priceUsd: 24.99,
    badge: 'Save 17%',
    features: [
      'Everything in Pro Monthly',
      'Rapid Speed Test Multiplier',
      'All 9 CEFR Tracks Unlocked (A1–C3)',
      'Priority Gemini 2.5 Flash neural synthesis'
    ],
  },
  {
    id: 'pro-1year',
    name: 'Pro Annual Mastery',
    type: 'subscription',
    duration: '1 Year',
    priceUsd: 39.99,
    badge: 'Best Value (Save 33%)',
    features: [
      'All Pro privileges for a full year',
      'Lifetime Grand Arena leader rank eligibility',
      'Unlimited custom native voice synthesis',
      'Dedicated Polyglot Certificate upon C3 completion'
    ],
  },
];
