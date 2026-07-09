import { Button, Input } from '@/shared/ui';
import { useGameStore } from '@/app/store/game-store';
import { useAudio } from '@/features/toggle-sound';
import { useShallow } from 'zustand/react/shallow';
import { CURRENCY_SYMBOL, MAX_BET } from '@/shared/constants';

const BET_AMOUNT_LABEL = 'Bet Amount';
const MAX_BET_LABEL_PREFIX = 'Max Bet:';
const BET_PLACEHOLDER = '0.00';
const HALF_BET_LABEL = '1/2';
const DOUBLE_BET_LABEL = 'x2';
const MAX_BET_BUTTON_LABEL = 'Max';

export const BetInput = () => {
  const { playSound } = useAudio();
  const { betAmount, setBetAmount, isLocked, halfBet, doubleBet, maxBet } = useGameStore(
    useShallow((state) => ({
      betAmount: state.betAmount,
      setBetAmount: state.setBetAmount,
      isLocked: state.isLocked,
      halfBet: state.halfBet,
      doubleBet: state.doubleBet,
      maxBet: state.maxBet,
    }))
  );

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex flex-col gap-2 max-xs:gap-1 px-0.5">
        <span className="text-sm max-xs:text-xs font-bold text-white uppercase tracking-[0.15em]">
          {BET_AMOUNT_LABEL}
        </span>
        <div className="flex justify-between">
          <span className="text-sm max-xs:text-xs text-white/30">{`${MAX_BET_LABEL_PREFIX} ${MAX_BET}.00`}</span>
          <span className="text-sm max-xs:text-xs text-white/30">{CURRENCY_SYMBOL}</span>
        </div>
      </div>

      <div className="relative flex items-center bg-surface-input border border-muted rounded-xl transition-all duration-200 focus-within:border-blue-500/40 focus-within:ring-1 focus-within:ring-blue-500/10">
        <Input
          type="number"
          value={betAmount || ''}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          placeholder={BET_PLACEHOLDER}
          disabled={isLocked}
          className="h-11 max-xs:h-9 border-none bg-transparent font-mono text-sm px-4 max-xs:px-2 text-white pl-4 pr-32 focus-visible:ring-0 placeholder:text-white/10"
        />

        <div className="absolute right-1.5 flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => {
              playSound('click');
              halfBet();
            }}
            disabled={isLocked}
            className="h-7 px-2 text-[10px] font-black text-white/40 hover:text-white rounded-md transition-all active:scale-95"
          >
            {HALF_BET_LABEL}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => {
              playSound('click');
              doubleBet();
            }}
            disabled={isLocked}
            className="h-7 px-2 text-[10px] font-black text-white/40 hover:text-white rounded-md transition-all active:scale-95"
          >
            {DOUBLE_BET_LABEL}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => {
              playSound('click');
              maxBet();
            }}
            disabled={isLocked}
            className="h-7 px-2 text-[10px] font-black text-white/40 hover:text-white rounded-md transition-all active:scale-95"
          >
            {MAX_BET_BUTTON_LABEL}
          </Button>
        </div>
      </div>
    </div>
  );
};
