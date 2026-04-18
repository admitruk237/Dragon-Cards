import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/app/store/game-store';
import { useEffect, useState } from 'react';
import { Button } from '@/shared/ui';
import { getMultiplierTitle } from '@/entities/risk';
import { GamePhase } from '@/shared/types';
import { useAudio } from '@/features/toggle-sound';
import { useShallow } from 'zustand/react/shallow';

export const ResultOverlay = () => {
  const { result, resultCategory, winAmount, gamePhase, resetRound } = useGameStore(
    useShallow((state) => ({
      result: state.result,
      resultCategory: state.resultCategory,
      winAmount: state.winAmount,
      gamePhase: state.gamePhase,
      resetRound: state.resetRound,
    }))
  );
  const [show, setShow] = useState(false);
  const { playSound } = useAudio();

  useEffect(() => {
    if (gamePhase === GamePhase.RESULT) {
      const timer = setTimeout(() => setShow(true), 1500);
      if (result === 'win') {
        playSound('win');
      } else if (result === 'draw') {
        playSound('draw');
      } else {
        playSound('lose');
      }
      return () => clearTimeout(timer);
    }
    setShow(false);
  }, [gamePhase, result]);

  const title = resultCategory ? getMultiplierTitle(resultCategory) : '';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
            className="flex flex-col items-center gap-6"
          >
            {result === 'win' ? (
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-4xl md:text-6xl font-black text-dragon-gold drop-shadow-[0_0_30px_rgba(255,204,0,0.6)] uppercase tracking-tighter text-center px-4"
                >
                  {title}
                </motion.div>
                <div className="text-2xl md:text-4xl font-mono text-white font-bold">
                  + {winAmount.toLocaleString()} <span className="opacity-50">$</span>
                </div>
              </div>
            ) : (
              <div className="text-3xl md:text-5xl font-black text-neon-pink drop-shadow-[0_0_30px_rgba(255,0,212,0.4)] uppercase text-center px-4">
                {title}
              </div>
            )}

            <Button
              variant="secondary"
              size="pill"
              className="mt-6"
              onClick={() => {
                playSound('click');
                resetRound();
              }}
            >
              Play Again
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
