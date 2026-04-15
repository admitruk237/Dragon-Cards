import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragonCard } from '@/entities/card/ui/DragonCard';
import { cn } from '@/lib/utils';

interface Props {
  id: string;
  isRevealed?: boolean;
  resultStatus?: 'win' | 'lost' | null;
  dragonType?: string;
  type: 'top' | 'bottom';
  onClick?: () => void;
  isSelected?: boolean;
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
        'relative rounded-2xl transition-all duration-200 cursor-pointer',
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
