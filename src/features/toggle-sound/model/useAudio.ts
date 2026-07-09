import { useCallback, useRef } from 'react';
import { useGameStore } from '@/app/store/game-store';

const SOUND_MAP = {
  flip: '/sounds/card-flip.mp3',
  click: '/sounds/click.wav',
  win: '/sounds/reward.mp3',
  lose: '/sounds/lose.m4a',
  draw: '/sounds/draw.wav',
} as const;

const DEFAULT_VOLUME = 0.3;

export type SoundKey = keyof typeof SOUND_MAP;

export const useAudio = () => {
  const isSoundOn = useGameStore((state) => state.isSoundOn);
  const audioCache = useRef<Partial<Record<SoundKey, HTMLAudioElement>>>({});

  const playSound = useCallback(
    (key: SoundKey, volume = DEFAULT_VOLUME) => {
      if (!isSoundOn) return;

      if (!audioCache.current[key]) {
        audioCache.current[key] = new Audio(SOUND_MAP[key]);
      }

      const audio = audioCache.current[key];
      if (!audio) return;

      audio.currentTime = 0;
      audio.volume = volume;
      audio.play().catch((err) => {
        console.warn('Audio play failed:', key, err);
      });
    },
    [isSoundOn]
  );

  return { playSound };
};
