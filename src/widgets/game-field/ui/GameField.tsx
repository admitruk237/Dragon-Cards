import { useGameStore } from '@/shared/lib/gameStore';
import { DragonCard } from '@/entities/card/ui/DragonCard';
import { RISK_CONFIG } from '@/entities/risk/model/risk.config';
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

export const GameField = () => {
  const { topCards, bottomCards, gamePhase, risk, reorderBottomCards, confirmArrangement } =
    useGameStore();
  const config = RISK_CONFIG[risk];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = bottomCards.findIndex((c) => c.id === active.id);
      const newIndex = bottomCards.findIndex((c) => c.id === over?.id);
      reorderBottomCards(oldIndex, newIndex);
    }
  };

  const getBadgeVariant = (val: number | 'LOST') => {
    if (val === 'LOST') return 'lost';
    if (val >= 10) return 'high';
    if (val >= 3) return 'win';
    return 'low';
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
              isRevealed={card.isRevealed}
              isWinner={card.value === 'WIN'}
            />
          ))}
        </div>
      </div>
      <div className="h-20 flex items-center justify-center">
        {gamePhase === 'arranging' && (
          <button
            onClick={confirmArrangement}
            className="group relative px-12 py-4 overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-neon-pink shadow-[0_0_30px_rgba(255,0,212,0.5)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10 text-white font-black uppercase text-sm tracking-[0.2em]">
              Confirm & Reveal
            </span>
          </button>
        )}
        {gamePhase === 'revealing' && (
          <span className="text-xl font-bold text-neon-cyan animate-pulse tracking-[0.5em] uppercase">
            Revealing...
          </span>
        )}
      </div>

      <div className="flex flex-col gap-6 items-center">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={bottomCards.map((c) => c.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex gap-4">
              {bottomCards.map((card, i) => (
                <div key={card.id} className="flex flex-col items-center gap-5">
                  <SortableCard id={card.id} dragonType={card.dragonType} type="bottom" />

                  <Badge variant={getBadgeVariant(config.multipliers_layout[i])}>
                    {config.multipliers_layout[i]}
                    {typeof config.multipliers_layout[i] === 'number' ? 'x' : ''}
                  </Badge>
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
