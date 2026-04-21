import type { Card, DragonType } from '@/shared/types';
import { shuffle } from '@/shared/lib/shuffle';

const DRAGON_TYPES: DragonType[] = ['fire', 'ice', 'storm', 'earth', 'shadow', 'wind'];

export const generateCards = (): { topCards: Card[]; bottomCards: Card[] } => {
  const shuffledTopDragons = shuffle([...DRAGON_TYPES]);
  const shuffledBottomDragons = shuffle([...DRAGON_TYPES]);

  const topCards: Card[] = shuffledTopDragons.map((type) => ({
    id: `top-${type}-${Math.random().toString(36).slice(2, 9)}`,
    dragonType: type,
    isRevealed: false,
  }));

  const bottomCards: Card[] = shuffledBottomDragons.map((type) => ({
    id: `bot-${type}`,
    dragonType: type,
    isRevealed: true,
  }));

  return { topCards, bottomCards };
};
