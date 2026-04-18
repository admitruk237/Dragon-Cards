import { Button } from '@/shared/ui';
import { useGameStore } from '@/app/store/game-store';
import { Volume2, VolumeOff } from 'lucide-react';
import { useAudio } from './hooks/useAudio';

export const SoundToggle = () => {
  const isSoundOn = useGameStore((state) => state.isSoundOn);
  const toggleSound = useGameStore((state) => state.toggleSound);
  const { playSound } = useAudio();
  return (
    <div className="absolute top-0 left-0 md:top-3 md:left-4 max-[500px]:scale-75 max-[500px]:origin-top-left">
      <Button variant="outline" size="lg" onClick={() => { playSound('click'); toggleSound(); }}>
        {isSoundOn ? <Volume2 /> : <VolumeOff />}
      </Button>
    </div>
  );
};
