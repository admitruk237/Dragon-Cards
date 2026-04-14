import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/shared/lib/gameStore';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export const ResultOverlay = () => {
  const { result, winAmount, gamePhase, resetRound } = useGameStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (gamePhase === 'result') {
      const timer = setTimeout(() => setShow(true), 500);
      return () => clearTimeout(timer);
    }
    setShow(false);
  }, [gamePhase]);

  return (
    <AnimatePresence>
      {show && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            {result === 'win' ? (
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-6xl font-black text-dragon-gold drop-shadow-[0_0_30px_rgba(255,204,0,0.6)] uppercase tracking-tighter"
                >
                  Big Win!
                </motion.div>
                <div className="text-4xl font-mono text-white font-bold">
                  + {winAmount.toLocaleString()}.00 <span className="text-lg opacity-50">$</span>
                </div>
              </div>
            ) : (
              <div className="text-5xl font-black text-neon-pink drop-shadow-[0_0_30px_rgba(255,0,212,0.4)] uppercase">
                Lost
              </div>
            )}

            <Button variant="secondary" size="pill" className="mt-6" onClick={resetRound}>
              Play Again
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
