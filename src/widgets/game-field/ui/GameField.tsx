import { useGameStore } from '@/shared/lib/gameStore';
import { DragonCard } from '@/entities/card/ui/DragonCard';
import { RISK_CONFIG } from '@/entities/risk/model/risk.config';
import { getMultiplierCategory, getMultiplierVariant } from '@/entities/risk/lib/multiplierUtils';
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { SortableCard } from './SortableCard';
import { Badge } from '@/components/ui/badge';
import { GamePhaseControls } from './GamePhaseControls';

export const GameField = () => {
  const { topCards, bottomCards, risk, moveBottomCard } = useGameStore();
  const config = RISK_CONFIG[risk];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    moveBottomCard(String(active.id), over ? String(over.id) : undefined);
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-6xl py-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col gap-6 items-center">
        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">
          Dragon Realm
        </span>
        <div className="flex gap-4">
          {topCards.map((card) => (
            <DragonCard
              key={card.id}
              type="top"
              id={card.id}
              dragonType={card.dragonType}
              isRevealed={card.isRevealed}
              resultStatus={card.resultStatus}
            />
          ))}
        </div>
      </div>
      <GamePhaseControls />
      <div className="flex flex-col gap-6 items-center">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={bottomCards.map((c) => c.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex gap-4">
              {bottomCards.map((card, i) => {
                const multiplier = config.multipliers_layout[i];
                const category = getMultiplierCategory(multiplier);

                return (
                  <div key={card.id} className="flex flex-col items-center gap-5">
                    <SortableCard
                      id={card.id}
                      dragonType={card.dragonType}
                      type="bottom"
                      resultStatus={card.resultStatus}
                    />

                    <Badge variant={getMultiplierVariant(category) as any}>
                      {multiplier}
                      {typeof multiplier === 'number' ? 'x' : ''}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
