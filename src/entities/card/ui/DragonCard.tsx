import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/shared/lib/gameStore';
import { cn } from '@/lib/utils';

const CARD_BACK = '/assets/cards/card_back.png';

const DRAGON_IMAGES: Record<string, string> = {
  fire: '/assets/cards/fire.png',
  ice: '/assets/cards/ice.png',
  storm: '/assets/cards/storm.png',
  earth: '/assets/cards/earth.png',
  shadow: '/assets/cards/shadow.png',
  wind: '/assets/cards/wind.png',
};

interface Props {
  id: string;
  isRevealed?: boolean;
  isWinner?: boolean;
  dragonType?: string;
  multiplier?: string | number;
  type: 'top' | 'bottom';
  className?: string;
  onClick?: () => void;
}

export const DragonCard = ({
  isRevealed = false,
  isWinner = false,
  dragonType = 'fire',
  multiplier,
  type,
  className,
  onClick,
}: Props) => {
  const { gamePhase } = useGameStore();

  const showFront = type === 'bottom' ? true : isRevealed;
  const currentImage = showFront ? DRAGON_IMAGES[dragonType || 'fire'] : CARD_BACK;

  let borderColor = 'border-white/10';
  if (showFront) {
    borderColor =
      isWinner && type === 'top' ? 'border-neon-cyan neon-glow-cyan' : 'border-white/20';
  }

  return (
    <div
      className={cn(
        'relative w-[130px] h-[180px] group transition-all duration-300',
        type === 'bottom' && gamePhase === 'arranging'
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
            showFront && !isWinner && type === 'top' && isRevealed ? 'opacity-30 grayscale' : ''
          )}
        >
          <img
            src={currentImage}
            className="absolute inset-0 w-full h-full object-cover z-0"
            alt="Card"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.style.backgroundColor = '#1a0505';
            }}
          />
          {showFront && (
            <div className="relative z-10 w-full h-full flex flex-col justify-end p-2 bg-gradient-to-t from-black via-transparent to-transparent">
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <span className="text-[14px] font-black uppercase text-white tracking-[0.2em]">
                  {dragonType}
                </span>
              </div>

              <AnimatePresence>
                {type === 'top' && isRevealed && isWinner && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-neon-cyan/10"
                  >
                    <span className="text-4xl font-black text-neon-cyan drop-shadow-[0_0_15px_#00f2ff] tracking-tighter">
                      WIN
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="relative z-20 text-[10px] font-black uppercase text-white/50 tracking-[0.2em] text-center mb-1">
                {dragonType}
              </span>
            </div>
          )}
          {showFront && multiplier && (
            <div className="absolute bottom-3 px-3 py-1 bg-black/80 rounded-full border border-white/20 z-30">
              <span className="text-[11px] font-black text-white">{multiplier}</span>
            </div>
          )}
          {!showFront && (
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
