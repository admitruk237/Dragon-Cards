import { useGameStore } from '@/shared/lib/gameStore';
import { ResultOverlay } from '@/widgets/result-overlay/ui/ResultOverlay';
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar';
import { GameView } from '@/widgets/game-view/ui/GameView';
import { MobileBalance } from '@/widgets/navigation/ui/MobileBalance';

function App() {
  const { balance, placeBet, gamePhase, confirmArrangement } = useGameStore();

  return (
    <div className="relative min-h-screen lg:h-screen max-w-[1280px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden font-sans selection:bg-neon-cyan/30">
      <div className="relative z-20 flex-1 w-full h-full flex flex-col-reverse lg:flex-row overflow-hidden rounded-2xl bg-[#0a0d14]/50 backdrop-blur-sm border border-white/5">
        <ResultOverlay />

        <Sidebar
          balance={balance}
          placeBet={placeBet}
          gamePhase={gamePhase}
          confirmArrangement={confirmArrangement}
        />

        <GameView />
      </div>

      <MobileBalance balance={balance} />
    </div>
  );
}

export default App;
