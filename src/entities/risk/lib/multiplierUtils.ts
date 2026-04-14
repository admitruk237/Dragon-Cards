export type MultiplierCategory = 'low' | 'win' | 'high' | 'lost';

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
};

export const getMultiplierTitle = (category: MultiplierCategory): string => TITLES[category] || '';

export const getMultiplierVariant = (category: MultiplierCategory): string => {
  return category;
};
