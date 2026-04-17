import { ResultOverlay } from '@/widgets/result-overlay';
import { Sidebar } from '@/widgets/sidebar';
import { GameView } from '@/widgets/game-view';
import { MobileBalance } from '@/widgets/navigation';

import { TooltipProvider } from '@/shared/ui/tooltip';

function App() {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="relative min-h-screen lg:h-screen max-w-[1280px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden font-sans selection:bg-neon-cyan/30">
        <MobileBalance />
        <div className="relative z-20 flex-1 w-full h-full flex flex-col-reverse lg:flex-row overflow-hidden rounded-2xl bg-surface-base/50 backdrop-blur-sm border border-white/5">
          <ResultOverlay />

          <Sidebar />

          <GameView />
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;
