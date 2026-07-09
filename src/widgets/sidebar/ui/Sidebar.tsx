import { BetInput } from '@/features/place-bet';
import { RiskSelector } from '@/features/select-risk';
import { useAudio } from '@/features/toggle-sound';
import { AnimatedNumber, Button } from '@/shared/ui';
import { GamePhase } from '@/shared/types';
import { useGameStore } from '@/app/store/game-store';
import { useShallow } from 'zustand/react/shallow';
import { BALANCE_LABEL } from '@/shared/constants';

const SIDEBAR_SR_LABEL = 'Sidebar content';
const PLACE_BET_LABEL = 'Place Bet';

export const Sidebar = () => {
  const { playSound } = useAudio();
  const { balance, placeBet, gamePhase } = useGameStore(
    useShallow((state) => ({
      balance: state.balance,
      placeBet: state.placeBet,
      gamePhase: state.gamePhase,
    }))
  );

  return (
    <aside className="w-full lg:w-[350px] h-auto lg:h-full flex flex-col px-6 max-xs:px-4 py-8 max-xs:py-4 lg:px-8 lg:py-10 gap-6 max-xs:gap-4 lg:gap-10 border-b lg:border-b-0 lg:border-r border-muted bg-surface-panel/80 lg:bg-surface-panel">
      <div className="flex flex-col gap-6 max-xs:gap-4 lg:gap-10 flex-1">
        <span className="sr-only">{SIDEBAR_SR_LABEL}</span>
        <BetInput />
        <RiskSelector />

        <Button
          onClick={() => {
            playSound('click');
            placeBet();
          }}
          disabled={gamePhase !== GamePhase.IDLE}
          className="lg:mt-0 max-xs:p-3 max-xs:text-xs"
        >
          {PLACE_BET_LABEL}
        </Button>
        <div className="mt-auto hidden lg:block">
          <div className="flex w-full justify-center items-center gap-2 p-3 rounded-sm bg-surface-highlight mt-2">
            <span className="text-sm uppercase text-white/20 tracking-[0.2em]">
              {BALANCE_LABEL}
            </span>
            <span className="text-sm text-white">
              <AnimatedNumber value={balance} decimals={2} duration={0.8} />
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
