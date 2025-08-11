import { useEffect, useState, useMemo, useCallback } from 'react';

import { RiMenuAddLine } from 'react-icons/ri';
import { TrackInfo } from './TrackInfo';
import { Controls } from './Controls';
import { ProgressBar } from './ProgressBar';
import { VolumeControl } from './VolumeControl';
import { PlayList } from './PlayList';
import { Caption } from './Caption';
import { useAudio } from '../context/AudioContext';
import { useSearchParams } from "react-router-dom";


export const AudioPlayer= ()  =>{

    const { tracks, loadAlbum, audioRef, currentTrack, playTrack } = useAudio();

    const [autoPlayAll, setAutoPlayAll] = useState(false);
    const [openDrawer,setOpenDrawer] = useState(false);
  
    const [params] = useSearchParams();
    const albumId = params.get("albumId");

    useEffect(() => {
     if (albumId) {
         loadAlbum(Number(albumId));
        }
      }, [albumId, loadAlbum]);
  
    const currentIndex = useMemo(() => {
        if (!currentTrack || !tracks || tracks.length === 0) {
            return -1;
        }
        return tracks.findIndex(track => track.id === currentTrack.id);
    }, [currentTrack, tracks]);
  
    const handleTogglePlayMode = useCallback(() => {
      setAutoPlayAll(prev => !prev);
    }, []);

    useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (autoPlayAll) {
        if (currentIndex !== -1 && currentIndex < tracks.length - 1) {
          playTrack(tracks[currentIndex + 1]);
        }
      } else {
        // Repeat current track
        audio.currentTime = 0;
        audio.play();
      }
    };
    
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);

    }, [audioRef, autoPlayAll, currentIndex, playTrack, tracks]);

    return (
    <div className="bg-slate-950 rounded-xl shadow-lg w-1/2 overflow-auto">
        <div className="w-full  mx-auto min-h-8 bg-[#2e2d2d] flex flex-col gap-9  justify-between items-center text-white p-[0.5rem_10px]">
        <TrackInfo />
        <div className="w-full flex flex-col items-center gap-1 m-auto flex-1">
            <Caption />  
            <Controls autoPlayAll={autoPlayAll} onTogglePlayMode={handleTogglePlayMode} />
            <ProgressBar />
        </div>
        <div className=" w-full flex flex-col items-center gap-1 m-auto flex-1 text-gray-400">
            <VolumeControl />
                <button onClick={() => setOpenDrawer((prev) => !prev)}>
                    <RiMenuAddLine size={32}/>
                </button>
        </div>
        </div>
        <div className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
            openDrawer? 'max-h-72' : 'max-h-0'}`} >
            <div className="bg-[#4c4848] text-white max-h-72 overflow-y-auto">
                <PlayList />
            </div>
        </div>
    </div>
    );
};
