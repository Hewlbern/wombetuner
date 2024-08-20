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

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-500 hover:text-green-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

interface SongPlaybackProps {
  songBlob: Blob;
}

export default function Component({ songBlob }: SongPlaybackProps) {
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
    setIsPlaying(!isPlaying);
  };

  const downloadSong = () => {
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = 'generated_song.mp3'; // You can customize the filename here
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
        <button 
          onClick={togglePlayPause} 
          className="bg-transparent border-none outline-none focus:outline-none"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button 
          onClick={downloadSong} 
          className="bg-transparent border-none outline-none focus:outline-none"
          aria-label="Download song"
        >
          <DownloadIcon />
        </button>
      </div>
    </div>
  );
}