import type { RiskLevel } from '@/shared/types';

export interface RiskConfig {
  multipliersLayout: (number | 'LOST')[];
}

export const RISK_CONFIG: Record<RiskLevel, RiskConfig> = {
  low: {
    multipliersLayout: [1.2, 1.5, 2, 2.5, 3, 'LOST'],
  },
  medium: {
    multipliersLayout: [1.5, 2, 3, 4, 'LOST', 'LOST'],
  },
  high: {
    multipliersLayout: [2, 3, 7, 'LOST', 'LOST', 'LOST'],
  },
  classic: {
    multipliersLayout: [5, 15, 'LOST', 'LOST', 'LOST', 'LOST'],
  },
};
