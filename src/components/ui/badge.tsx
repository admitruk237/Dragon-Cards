import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'px-4 py-1.5 rounded-lg border text-[11px] font-black uppercase tracking-wider transition-all duration-500',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        lost: 'bg-neon-pink text-white border-neon-pink/50 shadow-[0_0_15px_rgba(255,0,212,0.3)]',
        win: 'bg-amber-400 text-background border-amber-500/50',
        high: 'bg-dragon-gold text-background border-dragon-gold/50 shadow-[0_0_20px_rgba(255,204,0,0.5)]',
        low: 'bg-emerald-500 text-white border-emerald-400/50',
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
