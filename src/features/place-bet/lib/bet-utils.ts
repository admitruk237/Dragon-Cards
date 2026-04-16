import { MAX_BET, MIN_BET } from '@/shared/constants';

export const clampBet = (amount: number, balance: number): number => {
  return Math.min(Math.max(amount, MIN_BET), MAX_BET, balance);
};
