import { useRef } from 'react';
import { useGameStore } from '../gameStore';

const SOUND_MAP = {
  flip: '/sounds/card-flip.mp3',
  click: '/sounds/click.wav',
  bet: '/sounds/bet.mp3',
  win: '/sounds/reward.mp3',
  reveal: '/sounds/reveal.mp3',
  result: '/sounds/result.mp3',
  lose: '/sounds/lose.m4a',
  draw: '/sounds/draw.wav',
} as const;

export type SoundKey = keyof typeof SOUND_MAP;

export const useAudio = () => {
  const isSoundOn = useGameStore((state) => state.isSoundOn);
  const audioCache = useRef<Partial<Record<SoundKey, HTMLAudioElement>>>({});

  const playSound = (key: SoundKey, volume = 0.3) => {
    if (!isSoundOn) return;

    if (!audioCache.current[key]) {
      audioCache.current[key] = new Audio(SOUND_MAP[key]);
    }

    const audio = audioCache.current[key]!;
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play().catch((err) => {
      console.warn('Audio play failed:', key, err);
    });
  };

  return { playSound };
};
