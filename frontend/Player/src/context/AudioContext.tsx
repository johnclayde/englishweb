import { createContext, useContext, useRef, useState, useCallback } from 'react';
import { getAllSongs } from '../data/dataService';

export const AudioContext = createContext(null);

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [albumId, setAlbumId] = useState<number | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);

  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  


  const loadAlbum = useCallback(async (id: number) => {
    setAlbumId(id);
    const songs = await getAllSongs(id);
    setTracks(songs);
    //setCurrentTrack(0);
    setIsPlaying(false);
    // if (audioRef.current) {
    //   audioRef.current.src = songs[0]?.src || "";
    // }
  }, []);

  const playTrack = useCallback((track) => {
    if (track.src) {
      audioRef.current.src = `${track.src}`;
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentTrack(track);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const seek = useCallback((percent) => {
    if (audioRef.current.duration) {
      audioRef.current.currentTime = (percent / 100) * audioRef.current.duration;
    }
  }, []);

  const changeVolume = useCallback((val) => {
    const newVolume = parseFloat(val);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  }, []);

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        tracks,
        currentTrack,
        isPlaying,
        volume,
        playTrack,
        togglePlay,
        seek,
        changeVolume,
        albumId,
        loadAlbum
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};