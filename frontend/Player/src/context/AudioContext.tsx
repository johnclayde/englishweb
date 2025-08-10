import { createContext, useContext, useRef, useState } from 'react';

export const AudioContext = createContext(null);

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const albumId = 1;
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const playTrack = (track) => {
    if (track.src) {
      audioRef.current.src = `${track.src}`;
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentTrack(track);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (percent) => {
    if (audioRef.current.duration) {
      audioRef.current.currentTime = (percent / 100) * audioRef.current.duration;
    }
  };

  const changeVolume = (val) => {
    const newVolume = parseFloat(val);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        currentTrack,
        isPlaying,
        volume,
        playTrack,
        togglePlay,
        seek,
        changeVolume,
        albumId
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};