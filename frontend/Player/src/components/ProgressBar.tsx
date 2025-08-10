import { useState, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';

export const ProgressBar = () => {
  const {audioRef, seek } = useAudio();
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  useEffect(() => {
    const updateProgress = () => {
      const durationSec = audioRef.current.duration || 0;
      const current = audioRef.current.currentTime || 0;
      if (!isNaN(durationSec)) {
        setProgress((current / durationSec) * 100);
        setCurrentTime(formatTime(current));
        setDuration(formatTime(durationSec));
      }
    };

    const audio = audioRef.current;
    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [audioRef]);

  const handleSeek = (e) => {
    const value = parseFloat(e.target.value);
    setProgress(value);
    seek(value);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full px-4 flex flex-col gap-1">
      <div className="flex justify-between text-xs text-gray-300 px-1">
        <span>{currentTime}</span> 
        <span>   </span>
        <span>{duration}</span>
      </div>
      <input 
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        className="w-full appearance-none bg-gray-600 rounded-full cursor-pointer accent-green-500 h-1"
      />
    </div>
  );
};