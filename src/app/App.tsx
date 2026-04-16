import { useGameStore } from '@/app/store/game-store';
import { ResultOverlay } from '@/widgets/result-overlay';
import { Sidebar } from '@/widgets/sidebar';
import { GameView } from '@/widgets/game-view';
import { MobileBalance } from '@/widgets/navigation';

import { useShallow } from 'zustand/react/shallow';

function App() {
  const { balance, placeBet, gamePhase, confirmArrangement } = useGameStore(
    useShallow((state) => ({
      balance: state.balance,
      placeBet: state.placeBet,
      gamePhase: state.gamePhase,
      confirmArrangement: state.confirmArrangement,
    }))
  );

  return (
    <div className="relative min-h-screen lg:h-screen max-w-[1280px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row overflow-x-hidden lg:overflow-hidden font-sans selection:bg-neon-cyan/30">
      <MobileBalance balance={balance} />
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
    </div>
  );
}

export default App;
