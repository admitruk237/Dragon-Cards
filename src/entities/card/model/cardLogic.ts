import type { Card } from '@/shared/types/game.types';

export const getMatchStatus = (
  topCard: Card,
  bottomCard: Card,
  outcome: number | 'LOST'
): 'win' | 'lost' | null => {
  const isMatched = topCard.dragonType === bottomCard.dragonType;

  if (!isMatched) return null;

  return outcome === 'LOST' ? 'lost' : 'win';
};
