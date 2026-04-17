import { useGameStore } from '@/app/store/game-store';
import { DragonCard } from '@/entities/card';
import { getMultiplierCategory, getMultiplierVariant } from '@/entities/risk';
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
import { Badge } from '@/shared/ui';
import { useCallback, useMemo, useState } from 'react';
import { SoundToggle, useAudio } from '@/features/toggle-sound';
import { useShallow } from 'zustand/react/shallow';

export const GameField = () => {
  const { playSound } = useAudio();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { topCards, bottomCards, config, moveBottomCard, gamePhase } = useGameStore(
    useShallow((state) => ({
      topCards: state.topCards,
      bottomCards: state.bottomCards,
      config: state.config,
      moveBottomCard: state.moveBottomCard,
      gamePhase: state.gamePhase,
    }))
  );

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

  const handleCardClick = useCallback(
    (id: string) => {
      playSound('click');
      setSelectedId((prev) => {
        if (prev === null) return id;
        if (prev === id) return null;
        moveBottomCard(prev, id);
        return null;
      });
    },
    [playSound, moveBottomCard]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      moveBottomCard(String(active.id), over ? String(over.id) : undefined);
      playSound('flip');
    },
    [moveBottomCard, playSound]
  );

  const bottomCardsList = useMemo(() => bottomCards.map((c) => c.id), [bottomCards]);

  return (
    <div className="flex relative h-full flex-col items-center gap-12 max-[500px]:gap-8 md:gap-20 xl:gap-28 w-full max-w-6xl p-2 md:p-6 animate-in fade-in zoom-in duration-500">
      <SoundToggle />
      <div className="flex flex-col items-center mt-16 max-[500px]:mt-12 md:mt-10 xl:mt-14">
        <div className="flex gap-2 max-[500px]:gap-1 md:gap-4 xl:gap-8">
          {topCards.map((card) => (
            <DragonCard
              key={card.id}
              type="top"
              dragonType={card.dragonType}
              isRevealed={card.isRevealed}
              resultStatus={card.resultStatus}
              gamePhase={gamePhase}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6 items-center">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={bottomCardsList} strategy={horizontalListSortingStrategy}>
            <div className="flex gap-2 max-[500px]:gap-1 md:gap-4 xl:gap-8">
              {bottomCards.map((card, i) => {
                const multiplier = config.multipliersLayout[i];
                const category = getMultiplierCategory(multiplier);

                return (
                  <div
                    key={card.id}
                    className="flex flex-col items-center gap-1.5 max-[500px]:gap-0.5 md:gap-3 xl:gap-5"
                  >
                    <SortableCard
                      onClick={() => handleCardClick(card.id)}
                      isSelected={selectedId === card.id}
                      id={card.id}
                      dragonType={card.dragonType}
                      type="bottom"
                      resultStatus={card.resultStatus}
                      gamePhase={gamePhase}
                    />

                    <Badge
                      variant={getMultiplierVariant(category)}
                      className="px-2 py-0.5 text-[8px] max-[500px]:px-1 max-[500px]:text-[6px] md:px-3 md:py-1 md:text-[10px] xl:px-4 xl:py-1.5 xl:text-[11px]"
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
