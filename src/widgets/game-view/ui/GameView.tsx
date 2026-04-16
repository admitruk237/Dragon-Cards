import { GameField } from '@/widgets/game-field';
import bgImage from '@/assets/images/dragon_cave_bg.png';

export const GameView = () => {
  return (
    <main className="flex-1 min-w-0  h-full relative flex items-center justify-center overflow-hidden p-4 lg:p-0">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 lg:opacity-60 scale-100"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <GameField />
      </div>
    </main>
  );
};
