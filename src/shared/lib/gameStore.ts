import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Card, GamePhase, RiskLevel } from '@/shared/types/game.types';
import { generateCards } from './generateCards';
import { RISK_CONFIG } from '@/entities/risk/model/risk.config';

interface GameStore {
  balance: number;
  betAmount: number;
  risk: RiskLevel;
  gamePhase: GamePhase;
  topCards: Card[];
  bottomCards: Card[];
  result: 'win' | 'lost' | null;
  winAmount: number;
  isSoundOn: boolean;
  setBetAmount: (amount: number) => void;
  setRisk: (risk: RiskLevel) => void;
  placeBet: () => void;
  reorderBottomCards: (fromIndex: number, toIndex: number) => void;
  confirmArrangement: () => void;
  revealNext: (index: number) => void;
  finishRound: () => void;
  toggleSound: () => void;
  resetRound: () => void;
  halfBet: () => void;
  doubleBet: () => void;
  maxBet: () => void;
}

const { topCards: initialTop, bottomCards: initialBottom } = generateCards('low');

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      balance: 100000,
      betAmount: 1,
      risk: 'low',
      gamePhase: 'idle',
      topCards: initialTop,
      bottomCards: initialBottom,
      result: null,
      winAmount: 0,
      isSoundOn: true,

      setBetAmount: (amount) => {
        const { balance, gamePhase } = get();
        if (gamePhase !== 'idle' && gamePhase !== 'result') return;

        const MAX_BET = 1000;
        const allowed = Math.min(Math.max(amount, 1), MAX_BET, balance);
        set({ betAmount: allowed });
      },

      setRisk: (risk) => {
        if (get().gamePhase !== 'idle' && get().gamePhase !== 'result') return;
        set({ risk });
      },

      placeBet: () => {
        const { balance, betAmount, risk, gamePhase } = get();

        if (gamePhase !== 'idle' && gamePhase !== 'result') return;
        if (betAmount > balance || betAmount <= 0) return;

        const { topCards, bottomCards } = generateCards(risk);

        set({
          balance: balance - betAmount,
          topCards,
          bottomCards,
          gamePhase: 'arranging',
          result: null,
          winAmount: 0,
        });
      },

      reorderBottomCards: (fromIndex, toIndex) => {
        if (get().gamePhase !== 'arranging') return;
        const cards = [...get().bottomCards];
        const [moved] = cards.splice(fromIndex, 1);
        cards.splice(toIndex, 0, moved);
        set({ bottomCards: cards });
      },

      confirmArrangement: async () => {
        if (get().gamePhase !== 'arranging') return;
        set({ gamePhase: 'revealing' });

        const { topCards } = get();
        for (let i = 0; i < topCards.length; i++) {
          // eslint-disable-next-line no-await-in-loop
          await new Promise((resolve) => setTimeout(resolve, 350));
          get().revealNext(i);
        }

        await new Promise((resolve) => setTimeout(resolve, 600));
        get().finishRound();
      },

      revealNext: (index) => {
        set((state) => ({
          topCards: state.topCards.map((card, i) =>
            i === index ? { ...card, isRevealed: true } : card
          ),
        }));
      },

      finishRound: () => {
        const { topCards, betAmount, balance, risk } = get();
        const config = RISK_CONFIG[risk];

        const winIndex = topCards.findIndex((c) => c.value === 'WIN');
        const outcomeValue = config.multipliers_layout[winIndex];

        if (outcomeValue === 'LOST') {
          set({ result: 'lost', gamePhase: 'result' });
        } else {
          const winAmount = betAmount * outcomeValue;
          set({
            winAmount,
            result: 'win',
            balance: balance + winAmount,
            gamePhase: 'result',
          });
        }
      },

      toggleSound: () => {
        set((state) => ({ isSoundOn: !state.isSoundOn }));
      },

      resetRound: () => {
        set({
          gamePhase: 'idle',
          result: null,
          winAmount: 0,
        });
      },

      halfBet: () => {
        const { betAmount } = get();
        set({ betAmount: Math.max(1, Math.floor(betAmount / 2)) });
      },

      doubleBet: () => {
        const { betAmount, balance } = get();
        const MAX_BET = 1000;
        set({ betAmount: Math.min(balance, betAmount * 2, MAX_BET) });
      },

      maxBet: () => {
        const { balance } = get();
        const MAX_BET = 1000;
        set({ betAmount: Math.min(balance, MAX_BET) });
      },
    }),
    {
      name: 'dragon-cards-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        balance: state.balance,
        isSoundOn: state.isSoundOn,
      }),
    }
  )
);
