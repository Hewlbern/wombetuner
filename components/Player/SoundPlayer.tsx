import { useEffect, useState, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import SpectrogramPlugin from "wavesurfer.js/dist/plugins/spectrogram.esm.js";
import LoadingIndicator from "./Loading";
import SongPlayback from "./SongPlayback";
import SpectrogramDisplay from "./SpectrogramDisplay";

export type SoundPlayerProps = {
  src: Blob;
  initialImageQueryResult?: any;
  spectrogramQueryResult?: any;
  songBlob?: Blob | null;
  loadingSong: boolean;
  wombTuneData: {
    heartRate: number;
    genre: string;
    feeling: string;
    name: string;
  } | null;
};

export default function Component({ src, initialImageQueryResult, spectrogramQueryResult, songBlob, loadingSong, wombTuneData }: SoundPlayerProps) {
  const [ws, setWs] = useState<WaveSurfer | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const spectrogramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialImageQueryResult?.default) {
      const wordsArray = initialImageQueryResult.default.split(", ");
      setWords(wordsArray);
      setCurrentWordIndex(0);
    }
  }, [initialImageQueryResult]);

  useEffect(() => {
    const wordChangeInterval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(wordChangeInterval);
  }, [words]);

  useEffect(() => {
    if (containerRef.current && !ws) {
      const emeraldBlackColorMap = Array(256).fill(0).map((_, i) => [
        0,
        (i < 128 ? i * 2 : (255 - i) * 2) / 255,
        i / 255,
        1
      ]);

      const wavesurfer = WaveSurfer.create({
        container: containerRef.current,
        waveColor: "green",
        progressColor: "brown",
        cursorColor: "white",
        barWidth: 3,
        barRadius: 3,
        height: 128,
        plugins: [
          SpectrogramPlugin.create({
            container: spectrogramRef.current ?? undefined,
            labels: true,
            height: 256,
            colorMap: emeraldBlackColorMap,
          }),
        ],
      });

      wavesurfer.on('ready', () => {
        setWs(wavesurfer);
      });

      wavesurfer.on('play', () => setIsPlaying(true));
      wavesurfer.on('pause', () => setIsPlaying(false));
      wavesurfer.on('error', (e) => console.error('WaveSurfer error:', e));

      wavesurfer.loadBlob(src);

      return () => {
        wavesurfer.destroy();
      };
    }
  }, [src]);

  const playPause = () => {
    if (ws) {
      ws.playPause();
    }
  };

  if (loadingSong) {
    return (
      <div className="bg-black border border-green-400 p-1 soundPlayer relative min-w-96 max-w-4xl mx-auto shadow-lg w-1/2 rounded-lg overflow-hidden">
        <LoadingIndicator />
        <div ref={containerRef} className="relative">
        <div ref={spectrogramRef} id="wave-spectrogram" className="relative w-full">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black bg-opacity-75 px-4 py-2 rounded-lg">
            {words[currentWordIndex]}
          </p>
        </div>
      </div>
      <SpectrogramDisplay
        playPause={playPause}
        isPlaying={isPlaying}
      />
      </div>
    );
  }

  return (
    <div className="bg-black border border-green-400 p-1 soundPlayer relative min-w-96 max-w-4xl mx-auto shadow-lg w-1/2 rounded-lg overflow-hidden">
      {songBlob && <SongPlayback songBlob={songBlob} />}
      <div ref={containerRef} className="relative">
        <div ref={spectrogramRef} id="wave-spectrogram" className="relative w-full">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-black bg-opacity-75 px-4 py-2 rounded-lg">
            {words[currentWordIndex]}
          </p>
        </div>
      </div>
      <SpectrogramDisplay
        playPause={playPause}
        isPlaying={isPlaying}
      />
    </div>
  );
}