import type { Card, DragonType } from '../types/game.types';
import { shuffle } from './shuffle';

const DRAGON_TYPES: DragonType[] = ['fire', 'ice', 'storm', 'earth', 'shadow', 'wind'];

export const generateCards = (): { topCards: Card[]; bottomCards: Card[] } => {
  const shuffledTopDragons = shuffle([...DRAGON_TYPES]);
  const shuffledBottomDragons = shuffle([...DRAGON_TYPES]);

  const topCards: Card[] = shuffledTopDragons.map((type) => ({
    id: `top-${type}-${Math.random()}`,
    value: 0,
    dragonType: type,
    isRevealed: false,
  }));

  const bottomCards: Card[] = shuffledBottomDragons.map((type) => ({
    id: `bot-${type}`,
    value: 0,
    dragonType: type,
    isRevealed: true,
  }));

  return { topCards, bottomCards };
};
