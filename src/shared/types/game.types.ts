export type RiskLevel = 'low' | 'medium' | 'high' | 'classic';

export type GamePhase = 'idle' | 'arranging' | 'revealing' | 'result';

export interface Card {
  id: string;
  value: number | 'LOST' | 'WIN' | 'EMPTY';
  dragonType: DragonType;
  isRevealed: boolean;
}

export type DragonType = 'fire' | 'ice' | 'storm' | 'earth' | 'shadow' | 'wind';
