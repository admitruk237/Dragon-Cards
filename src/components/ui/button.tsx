import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';
import { type SoundKey, useAudio } from '@/shared/lib/hooks/useAudio';

const buttonVariants = cva(
  'cursor-pointer group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      variant: {
        default:
          'w-full bg-[#025cc1] p-5 cursor-pointer text-white font-black text-sm rounded-md hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(0,242,255,0.3)] hover:shadow-[0_0_20px_rgba(0,242,255,0.5)] disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed group/btn overflow-hidden relative',
        outline:
          'bg-[#141a26] p-4 h-auto aspect-square rounded-md text-base text-white/40 hover:bg-[#1c2331] hover:text-white/80 transition-all border border-white/5 active:scale-95',
        secondary:
          'bg-white text-black font-black uppercase text-sm rounded-full hover:bg-neon-cyan hover:scale-105 transition-all shadow-xl',
        ghost:
          'hover:bg-muted  p-3  bg-[#1b2030] hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
        link: 'text-primary underline-offset-4 hover:underline',
        neon: 'bg-neon-pink text-white shadow-[0_0_30px_rgba(255,0,212,0.5)] uppercase font-black tracking-[0.2em] rounded-full hover:scale-105 active:scale-95 transition-all relative overflow-hidden after:content-[""] after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/0 after:via-white/20 after:to-white/0 after:-translate-x-full hover:after:translate-x-full after:transition-transform after:duration-1000',
      },
      size: {
        default:
          'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: 'h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*="size-"])]:size-3',
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 gap-1.5 p-4 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        pill: 'h-auto px-12 py-3',
        icon: 'size-8',
        'icon-xs':
          'size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*="size-"])]:size-3',
        'icon-sm':
          'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
        'icon-lg': 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  soundType = 'click',
  onClick,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    soundType?: SoundKey;
  }) {
  const { playSound } = useAudio();
  const Comp = asChild ? Slot.Root : 'button';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (soundType) playSound(soundType);
    if (onClick) onClick(e);
  };

  return (
    <Comp
      onClick={handleClick}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
