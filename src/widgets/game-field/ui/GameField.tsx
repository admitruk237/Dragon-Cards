import { useGameStore } from '@/shared/lib/gameStore';
import { DragonCard } from '@/entities/card/ui/DragonCard';
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
import { useState } from 'react';
import { useAudio } from '@/shared/lib/hooks/useAudio';
import { SoundToggle } from '@/features/toggle-sound/SoundToggle';

export const GameField = () => {
  const { playSound } = useAudio();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { topCards, bottomCards, config, moveBottomCard } = useGameStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleCardClick = (id: string) => {
    playSound('click');
    if (selectedId === null) {
      setSelectedId(id);
    } else if (selectedId === id) {
      setSelectedId(null);
    } else {
      moveBottomCard(selectedId, id);
      setSelectedId(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    moveBottomCard(String(active.id), over ? String(over.id) : undefined);
    playSound('flip');
  };

  return (
    <div className="flex relative h-full flex-col items-center gap-6 md:gap-24 w-full max-w-6xl p-2 md:p-6 animate-in fade-in zoom-in duration-500">
      <SoundToggle />
      <div className="flex flex-col gap-4 md:gap-6 items-center mt-10 md:mt-20">
        <div className="flex gap-2 md:gap-4">
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
      <div className="flex flex-col gap-6 items-center">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={bottomCards.map((c) => c.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex gap-2 md:gap-4">
              {bottomCards.map((card, i) => {
                const multiplier = config.multipliers_layout[i];
                const category = getMultiplierCategory(multiplier);

                return (
                  <div key={card.id} className="flex flex-col items-center gap-2 md:gap-5">
                    <SortableCard
                      onClick={() => handleCardClick(card.id)}
                      isSelected={selectedId === card.id}
                      id={card.id}
                      dragonType={card.dragonType}
                      type="bottom"
                      resultStatus={card.resultStatus}
                    />

                    <Badge
                      variant={
                        getMultiplierVariant(category) as
                          | 'win'
                          | 'low'
                          | 'high'
                          | 'lost'
                          | 'default'
                      }
                    >
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
