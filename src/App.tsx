import { BetInput } from '@/features/place-bet/ui/BetInput';
import { RiskSelector } from '@/features/select-risk/ui/RiskSelector';
import { Lightning } from '@/shared/ui/Lightning';
import { useGameStore } from '@/shared/lib/gameStore';
import { GameField } from '@/widgets/game-field/ui/GameField';
import { ResultOverlay } from '@/widgets/result-overlay/ui/ResultOverlay';
import { AnimatedBalance } from '@/shared/ui/AnimatedBalance/AnimatedBalance';
import bgImage from '@/assets/images/dragon_cave_bg.png';

function App() {
  const { balance, placeBet, gamePhase } = useGameStore();

  return (
    <div className="relative h-screen w-full flex p-6 overflow-hidden bg-[#050608] font-sans selection:bg-neon-cyan/30">
      {/* 🌌 Глобальний ефект блискавок на фоні */}
      <div className="absolute inset-0 z-0 bg-[#06070a]">
        <Lightning hue={210} intensity={1.5} speed={0.4} size={1.5} />
        <div className="absolute inset-0 grainy-bg opacity-15" />
      </div>

      {/* 📦 Головний ігровий Врапер */}
      <div className="relative z-20 flex-1 w-full h-full flex overflow-hidden rounded-[3rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] bg-black/40 backdrop-blur-sm">
        {/* Оверлей з результатом (Big Win / Lost) */}
        <ResultOverlay />

        {/* 🛠️ Ліва панель керування (Sidebar HUD) */}
        <aside className="w-[400px] h-full flex flex-col px-8 py-10 gap-10 border-r border-white/5 bg-black/60 backdrop-blur-2xl">
          {/* Віджет балансу з анімацією цифр */}
          <div className="flex justify-between items-center px-2 border-b border-white/5 pb-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em]">
                Balance
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <AnimatedBalance
                  value={balance}
                  className="text-3xl font-mono text-neon-cyan font-bold leading-none neon-text-cyan"
                />
                <span className="text-sm font-bold text-neon-cyan opacity-50">$</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-neon-cyan neon-glow-cyan animate-pulse" />
            </div>
          </div>

          {/* Форма керування */}
          <div className="flex flex-col gap-10 flex-1">
            <BetInput />
            <RiskSelector />

            <div className="mt-auto">
              <button
                onClick={placeBet}
                disabled={gamePhase !== 'idle' && gamePhase !== 'result'}
                className="w-full h-18 bg-neon-cyan text-background font-black text-xl uppercase rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_50px_rgba(0,242,255,0.3)] hover:shadow-[0_0_70px_rgba(0,242,255,0.5)] disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed group/btn overflow-hidden relative"
              >
                <span className="relative z-10 tracking-widest group-hover:tracking-[0.2em] transition-all">
                  Place Bet
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
              <p className="text-center mt-4 text-[9px] font-bold text-white/10 uppercase tracking-[0.3em]">
                Dragon Cards v1.2.5
              </p>
            </div>
          </div>
        </aside>

        {/* 🐲 Права частина (Ігрове поле з власним фоном) */}
        <main className="flex-1 min-w-0 h-full relative flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60 scale-100"
            style={{ backgroundImage: `url(${bgImage})` }}
          />

          <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/80 via-transparent to-black/80 pointer-events-none" />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

          <div className="relative z-20 w-full h-full flex items-center justify-center p-6">
            <GameField />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
