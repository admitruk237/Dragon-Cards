import { BetInput } from '@/features/place-bet';
import { RiskSelector } from '@/features/select-risk';
import { Button } from '@/shared/ui';
import { GamePhase } from '@/shared/types';
import { useGameStore } from '@/app/store/game-store';
import { useShallow } from 'zustand/react/shallow';

export const Sidebar = () => {
  const { balance, placeBet, gamePhase, confirmArrangement } = useGameStore(
    useShallow((state) => ({
      balance: state.balance,
      placeBet: state.placeBet,
      gamePhase: state.gamePhase,
      confirmArrangement: state.confirmArrangement,
    }))
  );

  return (
    <aside className="w-full lg:w-[350px] h-auto lg:h-full flex flex-col px-6 max-[500px]:px-4 py-8 max-[500px]:py-4 lg:px-8 lg:py-10 gap-6 max-[500px]:gap-4 lg:gap-10 border-b lg:border-b-0 lg:border-r border-white/5 bg-surface-panel/80 lg:bg-surface-panel">
      <div className="flex flex-col gap-6 max-[500px]:gap-4 lg:gap-10 flex-1">
        <span className="sr-only">Sidebar content</span>
        <BetInput />
        <RiskSelector />

        <Button
          onClick={gamePhase === GamePhase.ARRANGING ? confirmArrangement : placeBet}
          className="lg:mt-0 max-[500px]:p-3 max-[500px]:text-xs"
        >
          {gamePhase === GamePhase.ARRANGING ? 'Confirm & Reveal' : 'Place Bet'}
        </Button>
        <div className="mt-auto hidden lg:block">
          <div className="flex w-full justify-center items-center gap-2 p-3 rounded-sm bg-surface-highlight mt-2">
            <span className="text-sm uppercase text-white/20 tracking-[0.2em]">Balance:</span>
            <span className="text-sm text-white">{balance.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
