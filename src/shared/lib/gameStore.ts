import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type Card, GamePhase, type RiskLevel } from '@/shared/types/game.types';
import { generateCards } from './generateCards';
import { RISK_CONFIG } from '@/entities/risk/model/risk.config';
import { type MultiplierCategory } from '@/entities/risk/lib/multiplierUtils';
import { clampBet } from './betUtils';
import { calculateRoundResult } from './roundUtils';
import { runRevealSequence } from './revealSequence';

interface GameStore {
  balance: number;
  betAmount: number;
  risk: RiskLevel;
  gamePhase: GamePhase;
  topCards: Card[];
  bottomCards: Card[];
  result: 'win' | 'lost' | null;
  resultCategory: MultiplierCategory | null;
  winAmount: number;
  isSoundOn: boolean;
  setBetAmount: (amount: number) => void;
  setRisk: (risk: RiskLevel) => void;
  placeBet: () => void;
  moveBottomCard: (activeId: string, overId?: string) => void;
  confirmArrangement: () => void;
  revealNext: (index: number) => void;
  finishRound: () => void;
  toggleSound: () => void;
  resetRound: () => void;
  halfBet: () => void;
  doubleBet: () => void;
  maxBet: () => void;
}

const { topCards: initialTop, bottomCards: initialBottom } = generateCards();

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      balance: 100000,
      betAmount: 1,
      risk: 'low',
      gamePhase: GamePhase.IDLE,
      topCards: initialTop,
      bottomCards: initialBottom,
      result: null,
      resultCategory: null,
      winAmount: 0,
      isSoundOn: true,

      setBetAmount: (amount) => {
        const { balance, gamePhase } = get();
        if (gamePhase !== GamePhase.IDLE && gamePhase !== GamePhase.RESULT) return;
        set({ betAmount: clampBet(amount, balance) });
      },

      setRisk: (risk) => {
        const { gamePhase } = get();
        if (gamePhase !== GamePhase.IDLE && gamePhase !== GamePhase.RESULT) return;
        set({ risk });
      },

      placeBet: () => {
        const { balance, betAmount, gamePhase } = get();

        if (gamePhase !== GamePhase.IDLE && gamePhase !== GamePhase.RESULT) return;
        if (betAmount > balance || betAmount <= 0) return;

        const { topCards, bottomCards } = generateCards();

        set({
          balance: balance - betAmount,
          topCards,
          bottomCards,
          gamePhase: GamePhase.ARRANGING,
          result: null,
          resultCategory: null,
          winAmount: 0,
        });
      },

      moveBottomCard: (activeId, overId) => {
        if (!overId || activeId === overId) return;
        if (get().gamePhase !== GamePhase.ARRANGING) return;

        const cards = [...get().bottomCards];
        const oldIndex = cards.findIndex((c) => c.id === activeId);
        const newIndex = cards.findIndex((c) => c.id === overId);

        if (oldIndex !== -1 && newIndex !== -1) {
          const [moved] = cards.splice(oldIndex, 1);
          cards.splice(newIndex, 0, moved);
          set({ bottomCards: cards });
        }
      },

      confirmArrangement: async () => {
        if (get().gamePhase !== GamePhase.ARRANGING) return;
        set({ gamePhase: GamePhase.REVEALING });

        await runRevealSequence(get().topCards.length, get().revealNext, get().finishRound);
      },

      revealNext: (index) => {
        set((state) => ({
          topCards: state.topCards.map((card, i) =>
            i === index ? { ...card, isRevealed: true } : card
          ),
        }));
      },

      finishRound: () => {
        const { topCards, bottomCards, betAmount, balance, risk } = get();
        const config = RISK_CONFIG[risk];

        const roundData = calculateRoundResult(
          topCards,
          bottomCards,
          config.multipliers_layout,
          betAmount,
          balance
        );

        set({
          topCards: roundData.updatedTop,
          bottomCards: roundData.updatedBottom,
          winAmount: roundData.winAmount,
          result: roundData.result,
          resultCategory: roundData.resultCategory,
          balance: roundData.newBalance,
          gamePhase: GamePhase.RESULT,
        });
      },

      toggleSound: () => {
        set((state) => ({ isSoundOn: !state.isSoundOn }));
      },

      resetRound: () => {
        set({
          gamePhase: GamePhase.IDLE,
          result: null,
          resultCategory: null,
          winAmount: 0,
        });
      },

      halfBet: () => {
        const { setBetAmount, betAmount } = get();
        setBetAmount(Math.floor(betAmount / 2));
      },

      doubleBet: () => {
        const { setBetAmount, betAmount } = get();
        setBetAmount(betAmount * 2);
      },

      maxBet: () => {
        const { setBetAmount, balance } = get();
        setBetAmount(balance);
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
