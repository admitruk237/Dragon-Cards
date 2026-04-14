export type RiskLevel = 'low' | 'medium' | 'high' | 'classic';

export enum GamePhase {
  IDLE = 'idle',
  ARRANGING = 'arranging',
  REVEALING = 'revealing',
  RESULT = 'result',
}

export interface Card {
  id: string;
  value: number | 'LOST' | 'WIN' | 'EMPTY';
  dragonType: DragonType;
  isRevealed: boolean;
  resultStatus?: 'win' | 'lost' | null;
}

export type DragonType = 'fire' | 'ice' | 'storm' | 'earth' | 'shadow' | 'wind';
