import { useGameStore } from '@/app/store/game-store';
import { useShallow } from 'zustand/react/shallow';
import { BALANCE_LABEL } from '@/shared/constants';

export const MobileBalance = () => {
  const { balance } = useGameStore(
    useShallow((state) => ({
      balance: state.balance,
    }))
  );

  return (
    <div className="lg:hidden mb-4 max-xs:mb-2 px-4 max-xs:px-3 py-3 max-xs:py-2 bg-surface-panel border border-muted rounded-xl flex justify-between items-center">
      <span className="text-xs max-xs:text-[10px] uppercase text-white/20 tracking-[0.2em]">
        {BALANCE_LABEL}
      </span>
      <span className="text-sm max-xs:text-xs font-bold text-white">
        ${balance.toFixed(2)}
      </span>
    </div>
  );
};
