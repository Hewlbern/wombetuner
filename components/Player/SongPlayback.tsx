import React, { useRef, useState, useEffect } from 'react';

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-500 hover:text-green-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5,3 19,12 5,21 5,3" />
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-500 hover:text-green-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

interface SongPlaybackProps {
  songBlob: Blob;
}

const SongPlayback: React.FC<SongPlaybackProps> = ({ songBlob }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioUrl = URL.createObjectURL(songBlob);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying); // Toggle playing state
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black p-4 rounded-lg shadow-lg">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-green-500">Now Playing</h3>
        <audio ref={audioRef} src={audioUrl} className="hidden">
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="control-panel flex justify-center items-center gap-4">
        <button onClick={togglePlayPause} className="bg-transparent border-none outline-none focus:outline-none">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </div>
  );
};

export default SongPlayback;