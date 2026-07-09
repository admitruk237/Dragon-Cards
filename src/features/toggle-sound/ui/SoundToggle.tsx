import { Button } from '@/shared/ui';
import { useGameStore } from '@/app/store/game-store';
import { Volume2, VolumeOff } from 'lucide-react';
import { useAudio } from '../model/useAudio';

export const SoundToggle = () => {
  const isSoundOn = useGameStore((state) => state.isSoundOn);
  const toggleSound = useGameStore((state) => state.toggleSound);
  const { playSound } = useAudio();
  return (
    <div className="absolute top-0 left-0 md:top-3 md:left-4 max-xs:scale-75 max-xs:origin-top-left">
      <Button
        variant="outline"
        size="lg"
        onClick={() => {
          playSound('click');
          toggleSound();
        }}
      >
        {isSoundOn ? <Volume2 /> : <VolumeOff />}
      </Button>
    </div>
  );
};
