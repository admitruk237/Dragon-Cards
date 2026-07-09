import { useGameStore } from '@/app/store/game-store';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui';
import { RISK_CONFIG } from '@/entities/risk';
import { useAudio } from '@/features/toggle-sound';
import { GamePhase, type RiskLevel } from '@/shared/types';
import { useShallow } from 'zustand/react/shallow';

const RISK_LEVELS: RiskLevel[] = ['low', 'medium', 'high', 'classic'];
const RISK_LEVEL_LABEL = 'Risk Level';

export const RiskSelector = () => {
  const { risk, setRisk, isLocked } = useGameStore(
    useShallow((state) => ({
      risk: state.risk,
      setRisk: state.setRisk,
      isLocked: state.gamePhase !== GamePhase.IDLE,
    }))
  );

  const { playSound } = useAudio();

  const handleRiskChange = (value: string) => {
    if (RISK_LEVELS.includes(value as RiskLevel)) {
      playSound('click');
      setRisk(value as RiskLevel);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center px-0.5">
        <span className="text-sm max-xs:text-xs font-bold text-white tracking-label">
          {RISK_LEVEL_LABEL}
        </span>
      </div>

      <ToggleGroup
        type="single"
        value={risk}
        onValueChange={handleRiskChange}
        disabled={isLocked}
        className="grid grid-cols-4 gap-1.5 p-1 transition-all duration-200 focus-within:border-focus/40"
      >
        {(Object.keys(RISK_CONFIG) as RiskLevel[]).map((level) => (
          <ToggleGroupItem
            key={level}
            value={level}
            className="h-9 max-xs:h-7 bg-surface-highlight px-0 text-3xs max-xs:text-4xs font-black uppercase tracking-wider rounded-lg border-none data-[state=on]:bg-neon-cyan/10 data-[state=on]:text-neon-cyan data-[state=on]:shadow-glow-cyan-inset hover:bg-muted transition-all"
          >
            {level}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
