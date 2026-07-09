export type MultiplierCategory = 'low' | 'win' | 'high' | 'lost' | 'draw';

const HIGH_MULTIPLIER_THRESHOLD = 10;
const WIN_MULTIPLIER_THRESHOLD = 3;

export const getMultiplierCategory = (val: number | 'LOST'): MultiplierCategory => {
  if (val === 'LOST') return 'lost';
  if (val >= HIGH_MULTIPLIER_THRESHOLD) return 'high';
  if (val >= WIN_MULTIPLIER_THRESHOLD) return 'win';
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
