import { useGameStore } from '@/shared/lib/gameStore';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { RISK_CONFIG } from '@/entities/risk/model/risk.config';
import { GamePhase, type RiskLevel } from '@/shared/types/game.types';

export const RiskSelector = () => {
  const { risk, setRisk, gamePhase } = useGameStore();

  const isLocked = gamePhase !== GamePhase.IDLE && gamePhase !== GamePhase.RESULT;

  const handleRiskChange = (value: string) => {
    if (value) setRisk(value as RiskLevel);
  };

  const currentMultipliers = RISK_CONFIG[risk].multipliers_layout.filter(
    (m): m is number => typeof m === 'number'
  );
  const maxWin = Math.max(...currentMultipliers);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center px-0.5">
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.15em]">
          Risk Level
        </span>
      </div>

      <ToggleGroup
        type="single"
        value={risk}
        onValueChange={handleRiskChange}
        disabled={isLocked}
        className="grid grid-cols-4 gap-1 p-1 bg-[#0d0f12] border border-white/5 rounded-xl transition-all duration-200 focus-within:border-blue-500/40"
      >
        {(Object.keys(RISK_CONFIG) as RiskLevel[]).map((level) => (
          <ToggleGroupItem
            key={level}
            value={level}
            className="h-9 px-0 text-[10px] font-black uppercase tracking-wider rounded-lg border-none data-[state=on]:bg-neon-cyan/10 data-[state=on]:text-neon-cyan data-[state=on]:shadow-[inset_0_0_10px_rgba(0,242,255,0.1)] hover:bg-white/5 transition-all"
          >
            {level}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="flex justify-between px-1 mt-1">
        <span className="text-[9px] font-medium text-white/20 italic text-neon-pink">
          Lost Slots: {RISK_CONFIG[risk].lostCount}
        </span>
        <span className="text-[9px] font-medium text-white/20 italic">Max Win: {maxWin}x</span>
      </div>
    </div>
  );
};
