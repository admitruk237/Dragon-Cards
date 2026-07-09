import CountUp from 'react-countup';

interface Props {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}

export const AnimatedNumber = ({ value, decimals = 2, duration = 0.8, className }: Props) => (
  <CountUp end={value} decimals={decimals} duration={duration} preserveValue className={className} />
);
