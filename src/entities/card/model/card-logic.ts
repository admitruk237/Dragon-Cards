import type { Card, ResultStatus } from '@/shared/types';

export const getMatchStatus = (
  topCard: Card,
  bottomCard: Card,
  outcome: number | 'LOST'
): ResultStatus => {
  const isMatched = topCard.dragonType === bottomCard.dragonType;

  if (!isMatched) return null;

  return outcome === 'LOST' ? 'lost' : 'win';
};
