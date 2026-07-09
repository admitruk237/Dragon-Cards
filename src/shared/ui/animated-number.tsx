import * as ReactCountUp from 'react-countup';
import type { ComponentType } from 'react';
import type { CountUpProps } from 'react-countup';

const resolveCountUp = (mod: unknown): ComponentType<CountUpProps> => {
  let candidate = mod;
  while (candidate && typeof candidate !== 'function' && 'default' in (candidate as object)) {
    candidate = (candidate as { default: unknown }).default;
  }
  return candidate as ComponentType<CountUpProps>;
};

const CountUp = resolveCountUp(ReactCountUp);

interface Props {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}

export const AnimatedNumber = ({ value, decimals = 2, duration = 0.8, className }: Props) => (
  <CountUp
    end={value}
    decimals={decimals}
    duration={duration}
    preserveValue
    className={className}
  />
);
