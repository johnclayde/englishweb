import { useAudio } from "../context/AudioContext";

export const TrackInfo = () => {
    const audioContext = useAudio();
    const currentTrack = audioContext ? audioContext.currentTrack : null;
    return (
      <div className="text-white text-sm lg:text-base">
        <p className="font-semibold"></p>
        {currentTrack ? (
          <div className="flex flex-col items-center justify-center">
            <p>{currentTrack.title}</p>
            <p> {currentTrack.author}</p>
            <img src={currentTrack.thumbnail} alt="thumbnail" className="w-120 h-60 mt-2 rounded" />
          </div>
        ) : (
          <p>wait to play...</p>
        )}
      </div>
    );
};
