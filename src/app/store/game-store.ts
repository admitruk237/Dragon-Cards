import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type Card, GamePhase, type RiskLevel } from '@/shared/types';
import { generateCards } from '@/entities/card';
import { type MultiplierCategory, RISK_CONFIG, type RiskConfig } from '@/entities/risk';
import { clampBet } from '@/features/place-bet';
import { calculateRoundResult, runRevealSequence } from '@/features/play-round';
import { INITIAL_BALANCE } from '@/shared/constants';

export interface GameStore {
  balance: number;
  betAmount: number;
  risk: RiskLevel;
  gamePhase: GamePhase;
  topCards: Card[];
  bottomCards: Card[];
  result: 'win' | 'lost' | 'draw' | null;
  resultCategory: MultiplierCategory | null;
  winAmount: number;
  isSoundOn: boolean;
  readonly config: RiskConfig;
  readonly isLocked: boolean;
  setBetAmount: (amount: number) => void;
  setRisk: (risk: RiskLevel) => void;
  placeBet: () => Promise<void>;
  moveBottomCard: (activeId: string, overId?: string, mode?: 'swap' | 'insert') => void;
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
      balance: INITIAL_BALANCE,
      betAmount: 1,
      risk: 'low',
      gamePhase: GamePhase.IDLE,
      topCards: initialTop,
      bottomCards: initialBottom,
      result: null,
      resultCategory: null,
      winAmount: 0,
      isSoundOn: true,

      get config() {
        return RISK_CONFIG[get().risk];
      },

      get isLocked() {
        const { gamePhase } = get();
        return gamePhase !== GamePhase.IDLE;
      },

      setBetAmount: (amount) => {
        const { balance, gamePhase } = get();
        if (gamePhase !== GamePhase.IDLE) return;
        set({ betAmount: clampBet(amount, balance) });
      },

      setRisk: (risk) => {
        const { gamePhase } = get();
        if (gamePhase !== GamePhase.IDLE) return;
        set({ risk });
      },

      placeBet: async () => {
        const { balance, betAmount, gamePhase } = get();

        if (gamePhase !== GamePhase.IDLE) return;
        if (betAmount > balance || betAmount <= 0) return;

        set({
          balance: balance - betAmount,
          gamePhase: GamePhase.REVEALING,
          result: null,
          resultCategory: null,
          winAmount: 0,
        });

        await runRevealSequence(
          get().topCards.length,
          (index) => get().revealNext(index),
          () => get().finishRound()
        );
      },

      moveBottomCard: (activeId, overId, mode: 'swap' | 'insert' = 'swap') => {
        if (!overId || activeId === overId) return;
        if (get().gamePhase !== GamePhase.IDLE) return;

        const cards = [...get().bottomCards];
        const oldIndex = cards.findIndex((c) => c.id === activeId);
        const newIndex = cards.findIndex((c) => c.id === overId);

        if (oldIndex !== -1 && newIndex !== -1) {
          if (mode === 'swap') {
            [cards[oldIndex], cards[newIndex]] = [cards[newIndex], cards[oldIndex]];
          } else {
            const [moved] = cards.splice(oldIndex, 1);
            cards.splice(newIndex, 0, moved);
          }
          set({ bottomCards: cards });
        }
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
          config.multipliersLayout,
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
        const { topCards } = generateCards();
        const bottomCards = get().bottomCards.map((card) => ({ ...card, resultStatus: undefined }));
        set({
          gamePhase: GamePhase.IDLE,
          topCards,
          bottomCards,
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
      merge: (persistedState, currentState) => Object.assign(currentState, persistedState),
      partialize: (state) => ({
        balance: state.balance,
        isSoundOn: state.isSoundOn,
        risk: state.risk,
      }),
    }
  )
);
