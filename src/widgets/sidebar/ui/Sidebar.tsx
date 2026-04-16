import { BetInput } from '@/features/place-bet';
import { RiskSelector } from '@/features/select-risk';
import { Button } from '@/shared/ui';
import { GamePhase } from '@/shared/types';

interface Props {
  balance: number;
  placeBet: () => void;
  gamePhase: GamePhase;
  confirmArrangement: () => void;
}

export const Sidebar = ({ balance, placeBet, gamePhase, confirmArrangement }: Props) => {
  return (
    <aside className="w-full lg:w-[350px] h-auto lg:h-full flex flex-col px-6 py-8 lg:px-8 lg:py-10 gap-6 lg:gap-10 border-b lg:border-b-0 lg:border-r border-white/5 bg-[#141a26]/80 lg:bg-[#141a26]">
      <div className="flex flex-col gap-6 lg:gap-10 flex-1">
        <span className="sr-only">Sidebar content</span>
        <BetInput />
        <RiskSelector />

        <Button
          onClick={gamePhase === GamePhase.ARRANGING ? confirmArrangement : placeBet}
          className="lg:mt-0"
        >
          {gamePhase === GamePhase.ARRANGING ? 'Confirm & Reveal' : 'Place Bet'}
        </Button>
        <div className="mt-auto hidden lg:block">
          <div className="flex w-full justify-center items-center gap-2 p-3 rounded-sm bg-[#1b2030] mt-2">
            <span className="text-sm uppercase text-white/20 tracking-[0.2em]">Balance:</span>
            <span className="text-sm text-white">{balance.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
