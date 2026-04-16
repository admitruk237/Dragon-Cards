import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/shared/lib/cn';
import { type DragonType, GamePhase, type ResultStatus } from '@/shared/types';
import { useAudio } from '@/features/toggle-sound';
import { memo, useEffect } from 'react';

const CARD_BACK = '/assets/cards/card_back.png';

const DRAGON_IMAGES: Record<DragonType, string> = {
  fire: '/assets/cards/fire.png',
  ice: '/assets/cards/ice.png',
  storm: '/assets/cards/storm.png',
  earth: '/assets/cards/earth.png',
  shadow: '/assets/cards/shadow.png',
  wind: '/assets/cards/wind.png',
};

interface Props {
  isRevealed?: boolean;
  resultStatus?: ResultStatus;
  dragonType?: DragonType;
  type: 'top' | 'bottom';
  className?: string;
  onClick?: () => void;
  gamePhase: GamePhase;
}

export const DragonCard = memo(
  ({
    isRevealed = false,
    resultStatus = null,
    dragonType = 'fire',
    type,
    className,
    onClick,
    gamePhase,
  }: Props) => {
    const { playSound } = useAudio();

    useEffect(() => {
      if (isRevealed) {
        playSound('flip');
      }
    }, [isRevealed, playSound]);

    const showFront = type === 'bottom' ? true : isRevealed;
    const currentImage = showFront ? DRAGON_IMAGES[dragonType || 'fire'] : CARD_BACK;

    let borderColor = 'border-white/10';
    if (showFront) {
      if (resultStatus === 'win')
        borderColor = 'border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.5)]';
      else if (resultStatus === 'lost')
        borderColor = 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]';
      else borderColor = 'border-white/20';
    }

    return (
      <div
        className={cn(
          'relative w-[65px] h-[120px] xl:w-[110px] lg:w-[85px] md:w-[100px] sm:w-[80px]  xl:h-[180px] lg:h-[160px] md:h-[180px] sm:h-[140px]  group transition-all duration-300',
          type === 'bottom' && gamePhase === GamePhase.ARRANGING
            ? 'cursor-grab active:cursor-grabbing hover:-translate-y-2'
            : 'cursor-default',
          className
        )}
        onClick={onClick}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={showFront ? 'front' : 'back'}
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'relative w-full h-full rounded-2xl overflow-hidden border-2 shadow-2xl bg-[#0a0c10] flex items-center justify-center',
              borderColor,
              showFront && gamePhase === GamePhase.RESULT && !resultStatus
                ? 'opacity-30 grayscale'
                : ''
            )}
          >
            <img
              src={currentImage}
              className="absolute inset-0 w-full h-full object-cover z-0"
              alt="Card"
            />
            {showFront && (
              <div
                className={cn(
                  'relative z-10 w-full h-full flex flex-col justify-end p-2 bg-gradient-to-t from-black via-transparent to-transparent',
                  resultStatus === 'win' && 'bg-green-400/10',
                  resultStatus === 'lost' && 'bg-red-500/10'
                )}
              >
                <span className="relative z-20 text-[8px] md:text-[10px] font-black uppercase text-white/50 tracking-[0.2em] text-center mb-0.5 md:mb-1">
                  {dragonType}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);

DragonCard.displayName = 'DragonCard';
