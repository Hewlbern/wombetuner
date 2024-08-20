import React from "react";

interface SpectrogramDisplayProps {
  playPause: () => void;
  isPlaying: boolean;
}

export default function Component({ playPause, isPlaying }: SpectrogramDisplayProps) {
  return (
    <div className="flex justify-center space-x-4 p-2">
      <button
        onClick={playPause}
        className="bg-green-500 text-white font-semibold px-6 py-2 rounded hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2"
      >
        {isPlaying ? "Pause Spectrogram" : "Play Spectrogram"}
      </button>
    </div>
  );
}