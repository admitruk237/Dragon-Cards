import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragonCard } from '@/entities/card';
import { cn } from '@/shared/lib/cn';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { type DragonType, GamePhase, type ResultStatus } from '@/shared/types';

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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.id,
  });

  const cardContent = (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={cn(
        'relative rounded-2xl cursor-pointer touch-none',
        !isDragging && 'transition-all duration-200',
        isDragging ? 'opacity-30' : 'opacity-100'
      )}
    >
      <DragonCard
        gamePhase={gamePhase}
        {...rest}
        className={cn(
          isSelected ? 'ring-2 rounded-2xl ring-yellow-400 scale-105 shadow-lg z-50' : 'ring-0'
        )}
      />
    </div>
  );

  if (gamePhase !== GamePhase.ARRANGING) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{cardContent}</TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-green-500/90 text-white border-red-500/20 px-3 py-1.5 font-bold uppercase tracking-wider text-[10px]"
        >
          Please place a bet!
        </TooltipContent>
      </Tooltip>
    );
  }

  return cardContent;
};
