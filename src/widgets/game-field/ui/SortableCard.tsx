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
}

export const SortableCard = (props: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={cn(isDragging ? 'opacity-30, z-100' : 'opacity-100 z-1')}
    >
      <DragonCard {...props} />
    </div>
  );
};
