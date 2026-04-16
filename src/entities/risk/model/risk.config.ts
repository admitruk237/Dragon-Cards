import type { RiskLevel } from '@/shared/types/game.types';

export interface RiskConfig {
  lostCount: number;
  multipliers_layout: (number | 'LOST')[];
}

export const RISK_CONFIG: Record<RiskLevel, RiskConfig> = {
  low: {
    lostCount: 1,
    multipliers_layout: [1.2, 1.5, 2, 2.5, 3, 'LOST'],
  },
  medium: {
    lostCount: 2,
    multipliers_layout: [1.5, 2, 3, 4, 'LOST', 'LOST'],
  },
  high: {
    lostCount: 3,
    multipliers_layout: [2, 3, 7, 'LOST', 'LOST', 'LOST'],
  },
  classic: {
    lostCount: 4,
    multipliers_layout: [5, 15, 'LOST', 'LOST', 'LOST', 'LOST'],
  },
};
