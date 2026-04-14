import { useGameStore } from '@/shared/lib/gameStore';
import { GamePhase } from '@/shared/types/game.types';
import { Button } from '@/components/ui/button';

export const GamePhaseControls = () => {
  const { gamePhase, confirmArrangement } = useGameStore();

  return (
    <div className="h-20 flex items-center justify-center">
      {gamePhase === GamePhase.ARRANGING && (
        <Button variant="neon" size="pill" onClick={confirmArrangement}>
          Confirm & Reveal
        </Button>
      )}
      {gamePhase === GamePhase.REVEALING && (
        <span className="text-xl font-bold text-neon-cyan animate-pulse tracking-[0.5em] uppercase">
          Revealing...
        </span>
      )}
    </div>
  );
};
