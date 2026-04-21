import { FINISH_DELAY_MS, REVEAL_DELAY_MS } from '@/shared/constants';

export const runRevealSequence = async (
  topCardsCount: number,
  revealNext: (index: number) => void,
  finishRound: () => void
): Promise<void> => {
  const revealStep = async (index: number): Promise<void> => {
    if (index >= topCardsCount) return;

    await new Promise((resolve) => setTimeout(resolve, REVEAL_DELAY_MS));
    revealNext(index);
    await revealStep(index + 1);
  };

  await revealStep(0);
  await new Promise((resolve) => setTimeout(resolve, FINISH_DELAY_MS));
  finishRound();
};
