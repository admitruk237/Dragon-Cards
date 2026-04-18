import { useDndContext } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragonCard } from '@/entities/card';
import { cn } from '@/shared/lib/cn';
import { type DragonType, GamePhase, type ResultStatus } from '@/shared/types';
import { motion } from 'framer-motion';

interface Props {
  id: string;
  isRevealed?: boolean;
  resultStatus?: ResultStatus;
  dragonType?: DragonType;
  type: 'top' | 'bottom';
  onClick?: () => void;
  isSelected?: boolean;
  gamePhase: GamePhase;
}

export const SortableCard = (props: Props) => {
  const { isSelected, onClick, gamePhase, ...rest } = props;
  const { active: dragActive } = useDndContext();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.id,
  });

  const isMovable = gamePhase === GamePhase.IDLE;

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...(isMovable ? listeners : {})}
      onClick={onClick}
      className={cn(
        'relative rounded-2xl cursor-pointer',
        gamePhase !== GamePhase.IDLE && 'cursor-not-allowed',
        isMovable && 'touch-none',
        !isDragging && 'transition-all duration-200',
        isDragging ? 'opacity-30' : 'opacity-100'
      )}
    >
      <motion.div layout={!dragActive} transition={{ duration: 0.35, ease: 'easeInOut' }}>
        <DragonCard
          gamePhase={gamePhase}
          {...rest}
          className={cn(isSelected ? 'ring-2 rounded-2xl ring-yellow-400 shadow-lg' : 'ring-0')}
        />
      </motion.div>
    </div>
  );
};
