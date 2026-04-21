export type RiskLevel = 'low' | 'medium' | 'high' | 'classic';

export enum GamePhase {
  IDLE = 'idle',
  ARRANGING = 'arranging',
  REVEALING = 'revealing',
  RESULT = 'result',
}

export interface Card {
  id: string;
  dragonType: DragonType;
  isRevealed: boolean;
  resultStatus?: ResultStatus;
}

export type DragonType = 'fire' | 'ice' | 'storm' | 'earth' | 'shadow' | 'wind';

export type ResultStatus = 'win' | 'lost' | null;
