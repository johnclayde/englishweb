
// VolumeControl.js
import { useAudio } from '../context/AudioContext';
import { HiSpeakerWave } from 'react-icons/hi2'; // modern speaker icon


export const VolumeControl = () => {
  const { volume, changeVolume } = useAudio();

  return (
   <div className="flex items-center gap-1 justify-start w-full">
     <div className="flex items-center ml-2">
      <HiSpeakerWave  className="size-4" />
        <input className="text-white text-sm accent-orange-500 rounded h-1"
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => changeVolume(e.target.value)}
        />
      </div>
    </div>
  );
};