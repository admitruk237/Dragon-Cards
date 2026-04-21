import type { Card } from '@/shared/types';
import { getMatchStatus } from '@/entities/card';
import { getMultiplierCategory, type MultiplierCategory } from '@/entities/risk';

interface RoundResult {
  updatedTop: Card[];
  updatedBottom: Card[];
  totalMultiplier: number;
  hasLostMatch: boolean;
  matchesFound: number;
  result: 'win' | 'lost' | 'draw';
  resultCategory: MultiplierCategory;
  winAmount: number;
  newBalance: number;
}

export const calculateRoundResult = (
  topCards: Card[],
  bottomCards: Card[],
  multipliersLayout: (number | 'LOST')[],
  betAmount: number,
  currentBalance: number
): RoundResult => {
  const gameResults = topCards.map((topCard, i) => {
    const outcome = multipliersLayout[i];
    const status = getMatchStatus(topCard, bottomCards[i], outcome);

    return {
      top: { ...topCard, resultStatus: status },
      bottom: { ...bottomCards[i], resultStatus: status },
      isMatch: Boolean(status),
      isLost: status === 'lost',
      multiplier: status === 'win' && typeof outcome === 'number' ? outcome : 0,
    };
  });

  const updatedTop = gameResults.map((r) => r.top);
  const updatedBottom = gameResults.map((r) => r.bottom);
  const matchesFound = gameResults.filter((r) => r.isMatch).length;
  const hasLostMatch = gameResults.some((r) => r.isLost);
  const totalMultiplier = gameResults.reduce((acc, r) => acc + r.multiplier, 0);

  const isLost = hasLostMatch;
  const isDraw = matchesFound === 0;

  if (isDraw) {
    return {
      updatedTop,
      updatedBottom,
      totalMultiplier,
      hasLostMatch,
      matchesFound,
      result: 'draw',
      resultCategory: 'draw',
      winAmount: 0,
      newBalance: currentBalance + betAmount,
    };
  }

  if (isLost) {
    return {
      updatedTop,
      updatedBottom,
      totalMultiplier,
      hasLostMatch,
      matchesFound,
      result: 'lost',
      resultCategory: 'lost',
      winAmount: 0,
      newBalance: currentBalance,
    };
  }

  const winAmount = betAmount * totalMultiplier;
  return {
    updatedTop,
    updatedBottom,
    totalMultiplier,
    hasLostMatch,
    matchesFound,
    result: 'win',
    resultCategory: getMultiplierCategory(totalMultiplier),
    winAmount,
    newBalance: currentBalance + winAmount,
  };
};
