import { useEffect, useState } from "react";
import { getAllSongs } from "../data/dataService"; // Adjust path as needed
import type { Track } from "../data/data_type";
import { useAudio } from "../context/AudioContext";


export const PlayList = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const { playTrack, currentTrack } = useAudio();

  useEffect(() => {
    const fetchTracks = async () => {
      const result = await getAllSongs();
      setTracks(result);
    };
    fetchTracks();
  }, []);

  return (
    <ul className="p-2">
      {tracks.map((track) => (
        <li
          key={track.id}
          className={`flex items-center gap-2 py-2 px-3 rounded cursor-pointer hover:bg-gray-600 ${
            currentTrack?.id === track.id ? 'bg-gray-700' : ''
          }`}
          onClick={() => playTrack(track)}
        >
          <img
            src={track.thumbnail}
            alt={track.title}
            className="w-10 h-10 rounded"
          />
          <div className="flex flex-col">
            <span className="font-medium">{track.title}</span>
            <span className="text-sm text-gray-300">{track.author}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};