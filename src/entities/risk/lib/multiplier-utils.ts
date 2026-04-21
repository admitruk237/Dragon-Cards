export type MultiplierCategory = 'low' | 'win' | 'high' | 'lost' | 'draw';

export const getMultiplierCategory = (val: number | 'LOST'): MultiplierCategory => {
  if (val === 'LOST') return 'lost';
  if (val >= 10) return 'high';
  if (val >= 3) return 'win';
  return 'low';
};

const TITLES: Record<MultiplierCategory, string> = {
  high: 'MEGA WIN!',
  win: 'Big Win!',
  low: 'Small Win',
  lost: 'Lost',
  draw: 'No win, no loss',
};

export const getMultiplierTitle = (category: MultiplierCategory): string => TITLES[category] || '';

export type BadgeVariant = 'win' | 'low' | 'high' | 'lost' | 'default';

const VARIANT_MAP: Record<MultiplierCategory, BadgeVariant> = {
  high: 'high',
  win: 'win',
  low: 'low',
  lost: 'lost',
  draw: 'default',
};

export const getMultiplierVariant = (category: MultiplierCategory): BadgeVariant =>
  VARIANT_MAP[category];
