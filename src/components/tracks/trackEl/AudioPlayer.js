import { useRef, useState, useEffect } from "react";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { PauseCircleIcon } from "@heroicons/react/24/outline";

const AudioPlayer = ({ id, src, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(null);
    } else {
      setIsPlaying(id);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="flex items-center gap-4 w-full max-w-md">
      {isPlaying ? (
        <button
          className={`${!src || "cursor-pointer"}`}
          disabled={!src}
          onClick={togglePlay}
          data-testid={`pause-button-${id}`}
        >
          <PauseCircleIcon className="h-6 w-6 text-almond" />
        </button>
      ) : (
        <button
          className={`${!src || "cursor-pointer"}`}
          disabled={!src}
          onClick={togglePlay}
          data-testid={`play-button-${id}`}
        >
          <PlayCircleIcon className="h-6 w-6 text-almond" />
        </button>
      )}    
      <input
        type="range"
        min="0"
        disabled={!src}
        max={duration}
        value={!src ? 0 : currentTime}
        onChange={handleSeek}
        step="0.1"
        className="flex-grow accent-player"
        data-testid={`audio-progress-{id}`}
      />
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        data-testid={`audio-player-${id}`}
      />
    </div>
  );
};

export default AudioPlayer;
