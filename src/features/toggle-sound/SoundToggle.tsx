import { Button } from '@/components/ui/button';
import { useGameStore } from '@/shared/lib/gameStore';
import { Volume2, VolumeOff } from 'lucide-react';

export const SoundToggle = () => {
  const isSoundOn = useGameStore((state) => state.isSoundOn);
  const toggleSound = useGameStore((state) => state.toggleSound);
  return (
    <div className="absolute top-3 left-4">
      <Button variant="outline" size="lg" onClick={toggleSound}>
        {isSoundOn ? <Volume2 /> : <VolumeOff />}
      </Button>
    </div>
  );
};
