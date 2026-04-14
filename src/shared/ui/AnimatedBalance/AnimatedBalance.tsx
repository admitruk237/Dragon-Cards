import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface Props {
  value: number;
  className?: string;
}

export const AnimatedBalance = ({ value, className }: Props) => {
  const springConfig = { damping: 30, stiffness: 100 };
  const spring = useSpring(value, springConfig);
  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span className={className}>{display}</motion.span>;
};
