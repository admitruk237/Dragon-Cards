import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragonCard } from '@/entities/card';
import { cn } from '@/shared/lib/cn';
import type { DragonType, GamePhase, ResultStatus } from '@/shared/types';

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
  const { isSelected, onClick, ...rest } = props;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={cn(
        'relative rounded-2xl cursor-pointer',
        !isDragging && 'transition-all duration-200',
        isDragging ? 'opacity-30' : 'opacity-100'
      )}
    >
      <DragonCard
        {...rest}
        className={cn(
          isSelected ? 'ring-2 rounded-2xl ring-yellow-400 scale-105 shadow-lg z-50' : 'ring-0'
        )}
      />
    </div>
  );
};
