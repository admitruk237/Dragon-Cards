import { Button, Input } from '@/shared/ui';
import { useGameStore } from '@/app/store/game-store';
import { useShallow } from 'zustand/react/shallow';

export const BetInput = () => {
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
      <div className="flex flex-col gap-2 max-[500px]:gap-1 px-0.5">
        <span className="text-sm max-[500px]:text-xs font-bold text-white uppercase tracking-[0.15em]">
          Bet Amount
        </span>
        <div className="flex justify-between">
          <span className="text-sm max-[500px]:text-xs text-white/30">Max: 1000.00</span>
          <span className="text-sm max-[500px]:text-xs text-white/30">$</span>
        </div>
      </div>

      <div className="relative flex items-center bg-surface-input border border-white/5 rounded-xl transition-all duration-200 focus-within:border-blue-500/40 focus-within:ring-1 focus-within:ring-blue-500/10">
        <Input
          type="number"
          value={betAmount || ''}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          placeholder="0.00"
          disabled={isLocked}
          className="h-11 max-[500px]:h-9 border-none bg-transparent font-mono text-sm px-4 max-[500px]:px-2 text-white pl-4 pr-32 focus-visible:ring-0 placeholder:text-white/10"
        />

        <div className="absolute right-1.5 flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={halfBet}
            disabled={isLocked}
            className="h-7 px-2 text-[10px] font-black text-white/40 hover:text-white hover:bg-white/5 rounded-md transition-all active:scale-95"
          >
            1/2
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={doubleBet}
            disabled={isLocked}
            className="h-7 px-2 text-[10px] font-black text-white/40 hover:text-white hover:bg-white/5 rounded-md transition-all active:scale-95"
          >
            x2
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={maxBet}
            disabled={isLocked}
            className="h-7 px-2 text-[10px] font-black text-white/40 hover:text-white hover:bg-white/5 rounded-md transition-all active:scale-95"
          >
            Max
          </Button>
        </div>
      </div>
    </div>
  );
};
