import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/shared/lib/cn';

const badgeVariants = cva(
  'px-4 py-1.5 rounded-lg border text-2xs font-black uppercase tracking-wider transition-all duration-500',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        lost: 'bg-neon-pink text-white border-neon-pink/50 shadow-glow-pink',
        win: 'bg-badge-win text-background border-badge-win-border/50',
        high: 'bg-dragon-gold text-background border-dragon-gold/50 shadow-glow-gold',
        low: 'bg-badge-low text-white border-badge-low-border/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
