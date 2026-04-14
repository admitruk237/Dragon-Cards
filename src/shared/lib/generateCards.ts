import { RISK_CONFIG } from '@/entities/risk/model/risk.config';
import type { Card, DragonType, RiskLevel } from '../types/game.types';
import { shuffle } from './shuffle';

const DRAGON_TYPES: DragonType[] = ['fire', 'ice', 'storm', 'earth', 'shadow', 'wind'];

export const generateCards = (risk: RiskLevel): { topCards: Card[]; bottomCards: Card[] } => {
  const config = RISK_CONFIG[risk];

  const winCount = 6 - config.lostCount;
  const topValues: ('WIN' | 'EMPTY')[] = [
    ...Array(winCount).fill('WIN'),
    ...Array(6 - winCount).fill('EMPTY'),
  ];

  const shuffledTop = shuffle(topValues);

  const topCards: Card[] = shuffledTop.map((value) => ({
    id: `top-${Math.random()}`,
    value: value,
    dragonType: 'fire',
    isRevealed: false,
  }));
  const shuffledDragons = shuffle([...DRAGON_TYPES]);

  const bottomCards: Card[] = shuffledDragons.map((type) => ({
    id: `bot-${type}`,
    value: 0,
    dragonType: type,
    isRevealed: true,
  }));

  return { topCards, bottomCards };
};
