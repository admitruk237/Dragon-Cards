import { useGameStore } from '@/app/store/game-store';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui';
import { RISK_CONFIG } from '@/entities/risk';
import { type RiskLevel } from '@/shared/types';
import { useShallow } from 'zustand/react/shallow';

const RISK_LEVELS: RiskLevel[] = ['low', 'medium', 'high', 'classic'];
export const RiskSelector = () => {
  const { risk, setRisk, isLocked } = useGameStore(
    useShallow((state) => ({
      risk: state.risk,
      setRisk: state.setRisk,
      isLocked: state.isLocked,
    }))
  );

  const handleRiskChange = (value: string) => {
    if (RISK_LEVELS.includes(value as RiskLevel)) {
      setRisk(value as RiskLevel);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center px-0.5">
        <span className="text-sm max-[500px]:text-xs font-bold text-white  tracking-[0.15em]">
          Risk Level
        </span>
      </div>

      <ToggleGroup
        type="single"
        value={risk}
        onValueChange={handleRiskChange}
        disabled={isLocked}
        className="grid grid-cols-4 gap-1.5 p-1  transition-all duration-200 focus-within:border-blue-500/40"
      >
        {(Object.keys(RISK_CONFIG) as RiskLevel[]).map((level) => (
          <ToggleGroupItem
            key={level}
            value={level}
            className="h-9 max-[500px]:h-7 bg-surface-highlight px-0 text-[10px] max-[500px]:text-[8px] font-black uppercase tracking-wider rounded-lg border-none data-[state=on]:bg-neon-cyan/10 data-[state=on]:text-neon-cyan data-[state=on]:shadow-[inset_0_0_10px_rgba(0,242,255,0.1)] hover:bg-white/5 transition-all"
          >
            {level}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
