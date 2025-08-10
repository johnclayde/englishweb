// Controls.js
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import { useAudio } from '../context/AudioContext';
import { MdRepeatOne, MdQueueMusic } from 'react-icons/md';
import { useState } from 'react';


export const Controls = () => {
  
  const { isPlaying, togglePlay, audioRef } = useAudio();
  const [autoPlayAll, setAutoPlayAll] = useState(false);
  // Set playback rate to 2x for fast forward
  const handleFastForward = () => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 1.5;
    }
  };

  // Set playback rate to 0.5x for fast backward (slow motion)
  const handleFastBackward = () => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 0.75;
    }
  };

  // Toggle single track / auto play all mode
  const handleTogglePlayMode = () => {
    setAutoPlayAll((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-x-20 justify-between px-4 py-2 ">
      <button onClick={handleFastBackward}><FaBackward /></button>
      <button onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</button>
      <button onClick={handleFastForward}><FaForward /></button>
           <button onClick={handleTogglePlayMode} title={autoPlayAll ? "Auto Play All" : "Single Track"}>
        {autoPlayAll ? <MdQueueMusic size={24} /> : <MdRepeatOne size={24} />}
      </button>

    </div>
  );
};