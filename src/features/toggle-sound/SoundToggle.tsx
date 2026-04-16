import { Button } from '@/shared/ui';
import { useGameStore } from '@/app/store/game-store';
import { Volume2, VolumeOff } from 'lucide-react';

export const SoundToggle = () => {
  const isSoundOn = useGameStore((state) => state.isSoundOn);
  const toggleSound = useGameStore((state) => state.toggleSound);
  return (
    <div className="absolute top-0 left-0 md:top-3 md:left-4">
      <Button variant="outline" size="lg" onClick={toggleSound}>
        {isSoundOn ? <Volume2 /> : <VolumeOff />}
      </Button>
    </div>
  );
};
