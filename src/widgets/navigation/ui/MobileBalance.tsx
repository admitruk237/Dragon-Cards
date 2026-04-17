import { useGameStore } from '@/app/store/game-store';
import { useShallow } from 'zustand/react/shallow';

export const MobileBalance = () => {
  const { balance } = useGameStore(
    useShallow((state) => ({
      balance: state.balance,
    }))
  );

  return (
    <div className="lg:hidden mb-4 max-[500px]:mb-2 px-4 max-[500px]:px-3 py-3 max-[500px]:py-2 bg-surface-panel border border-white/5 rounded-xl flex justify-between items-center">
      <span className="text-xs max-[500px]:text-[10px] uppercase text-white/20 tracking-[0.2em]">
        Balance:
      </span>
      <span className="text-sm max-[500px]:text-xs font-bold text-white">
        ${balance.toFixed(2)}
      </span>
    </div>
  );
};
