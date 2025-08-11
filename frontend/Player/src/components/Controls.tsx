// Controls.js
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import { useAudio } from '../context/AudioContext';
import { MdRepeatOne, MdQueueMusic } from 'react-icons/md';

type ControlsProps = {
  autoPlayAll: boolean;
  onTogglePlayMode: () => void;
};

export const Controls = ({ autoPlayAll, onTogglePlayMode }: ControlsProps) => {
  
  const { isPlaying, togglePlay, audioRef, tracks, playTrack, currentTrack } = useAudio();

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime + seconds;
      // Ensure the new time is within the valid range
      audioRef.current.currentTime = Math.max(0, Math.min(newTime, audioRef.current.duration || 0));
    }
  };

  const handleTogglePlay = () => {
    // If there is no current track, play the first track from the list.
    if (!currentTrack && tracks && tracks.length > 0 && !isPlaying) {
      playTrack(tracks[0]);
      console.log(" no track playing , will play now ")
    } else {
      togglePlay();
      console.log("  track is playing , will pause  ")

    }
  };

  return (
    <div className="flex items-center gap-x-20 justify-between px-4 py-2 ">
      <button onClick={() => skipTime(-10)} title="Rewind 10s"><FaBackward /></button>
      <button onClick={handleTogglePlay} title={isPlaying ? "Pause" : "Play"}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
      <button onClick={() => skipTime(10)} title="Forward 10s"><FaForward /></button>
      <button onClick={onTogglePlayMode} title={autoPlayAll ? "Auto Play All" : "Single Track"}>
        {autoPlayAll ? <MdQueueMusic size={24} /> : <MdRepeatOne size={24} />}
      </button>

    </div>
  );
};