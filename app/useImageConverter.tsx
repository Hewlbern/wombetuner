// hooks/useImageConverter.ts
import { useState } from "react";
// @ts-ignore
import { imageToAudio, leftToRightRGB } from "image-to-audio";
import { generateCLIP, HuggingfaceResponse } from "./api/generateCLIP";
import { generateSong, generateMelody } from "./api/generateSong";

// List of fallback descriptions for ultrasound images and spectrograms
const ultrasoundFallbacks = [
  "Ultrasound capturing a serene baby in gentle repose",
  "A glimpse into the womb reveals a tranquil prenatal scene",
  "Ultrasound image of a peaceful fetus, nestled comfortably",
  "The miracle of life shown through prenatal ultrasound",
  "An intimate portrait of baby's first gentle movements",
  "Ethereal silhouette of a developing life in utero",
  "Grayscale wonder of a fetus floating in amniotic serenity",
  "Ultrasound reveals the delicate profile of an unborn child",
  "A window to the womb showcasing fetal development",
  "Shadowy outlines of tiny hands and feet in an ultrasound image",
  "The first glimpse of parental love through ultrasound technology",
  "Intricate details of fetal anatomy captured in ultrasound",
  "A cosmic dance of light and shadow revealing prenatal life",
  "Ultrasound poetry: the visual rhythm of a growing heartbeat",
  "The story of life unfolds in black and white ultrasound imagery",
  "Fetal acrobatics frozen in time by ultrasound technology",
  "A lullaby in grayscale: the ultrasound's soothing visual melody",
  "The womb's secret garden revealed through ultrasound imagery",
  "Prenatal portraiture: an ultrasound's artistic rendering of new life",
  "The first chapter of life's story written in ultrasound echoes",
  "Ultrasound captures the gentle curve of a developing spine",
  "A symphony of cells harmonizing in an ultrasound snapshot",
  "The miracle of miniature humanity displayed in ultrasound detail",
  "Whispers of existence echoed in ultrasound waves",
  "The canvas of creation painted in ultrasound gradients"
];

const spectrogramFallbacks = [
  "Spectrogram displaying intricate patterns of prenatal heartbeats",
  "Audio visualization of a baby's early movements in the womb",
  "Spectrogram captures the rhythmic whispers of a fetal heartbeat",
  "A visual echo of serene prenatal sounds",
  "Harmonic analysis of a developing life's first sounds",
  "Colorful waves dance across the spectrogram, depicting fetal vitality",
  "The symphony of the womb translated into spectrogram imagery",
  "Fetal heartbeat's staccato rhythm painted in spectrogram hues",
  "A tapestry of frequencies weaving the story of prenatal development",
  "Spectrogram reveals the hidden melodies of life before birth",
  "The gentle lullaby of the womb visualized in spectrogram form",
  "Prenatal percussion captured in the peaks and valleys of a spectrogram",
  "The acoustic fingerprint of a new life displayed in vivid spectrogram detail",
  "Spectrogram art: the abstract expression of fetal soundscapes",
  "The whisper of forming organs echoed in spectrogram patterns",
  "A chromatic celebration of life's earliest symphonies",
  "Fetal movement's gentle cadence illustrated in spectrogram waves",
  "The heartbeat waltz: a spectrogram's interpretation of prenatal rhythm",
  "Amniotic acoustics painted in the bold strokes of spectrogram analysis",
  "The unborn's secret song revealed through spectrogram technology",
  "Spectrogram captures the delicate duet of mother and child's heartbeats",
  "The womb's white noise transformed into a vibrant spectrogram palette",
  "Fetal hiccups create playful ripples across the spectrogram canvas",
  "The lullaby of blood flow visualized in soothing spectrogram tones",
  "Spectrogram echoes the gentle swoosh of amniotic tides"
];

// Function to get a random description from a given list
const getRandomDescription = (descriptions: string[]) => {
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const useImageConverter = () => {
  const [result, setResult] = useState<{
    audioBlob: Blob;
    spectrogramUrl: string;
  } | null>(null);
  const [initialImageQueryResult, setInitialImageQueryResult] = useState<any>(null);
  const [spectrogramQueryResult, setSpectrogramQueryResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [songBlob, setSongBlob] = useState<Blob | null>(null);

  const convertImage = async (
    url: string,
    file: File,
    wombTuneData: {
      heartRate: number;
      genre: string;
      feeling: string;
      name: string;
    }
  ) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
      }
      const buffer = await res.arrayBuffer();

      const audioResult = await imageToAudio(
        buffer,
        leftToRightRGB({ maxFreq: 20000 }),
        { sampleRate: 8000, bpm: wombTuneData.heartRate, beat: 1 / 4 }
      );

      if (!audioResult || !audioResult.blob || !audioResult.imageData) {
        throw new Error("Audio conversion failed or returned incomplete data.");
      }

      const spectrogramData = new Uint8Array(audioResult.imageData.data.flat());
      const spectrogramBlob = new Blob([spectrogramData.buffer], {
        type: "image/jpeg",
      });
      const spectrogramUrl = URL.createObjectURL(spectrogramBlob);
      setResult({ audioBlob: audioResult.blob, spectrogramUrl });

      const ultrasoundResult = await generateClipResult(
        file,
        ["ultrasound", "pregnancy scan", "fetal imaging"],
        ultrasoundFallbacks
      );
      setInitialImageQueryResult(ultrasoundResult);

      const spectrogramResult = await generateClipResult(
        spectrogramBlob,
        ["spectrogram", "audio visualization", "frequency plot", "sound wave", "acoustic analysis", "audio spectrum", "sonogram", "waveform display"],
        spectrogramFallbacks
      );
      setSpectrogramQueryResult(spectrogramResult);

      const description = `${ultrasoundResult}; ${spectrogramResult}; 
        Heart rate: ${wombTuneData.heartRate} BPM; 
        Genre: ${wombTuneData.genre}; 
        Feeling: ${wombTuneData.feeling}; 
        Name: ${wombTuneData.name}; 
        atmospheric, teardrop`;
      
      // Try generateMelody first
      try {
        const melodyResponse = await generateMelody({
          prompt: description,
          input_audio: URL.createObjectURL(audioResult.blob),
          duration: 30, // Adjust as needed
          model_version: "melody-large"
        });
        if (melodyResponse && melodyResponse.url) {
          const songResponse = await fetch(melodyResponse.url);
          setSongBlob(await songResponse.blob());
        } else {
          throw new Error("Failed to receive valid melody URL.");
        }
      } catch (melodyError) {
        // If generateMelody fails, fall back to generateSong
        console.warn("Melody generation failed, falling back to song generation:", melodyError);
        const songResponse = await generateSong(description);
        if (songResponse && songResponse.blob) {
          setSongBlob(songResponse.blob);
        } else {
          throw new Error("Failed to receive valid song blob.");
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        // Error handling remains, but without console.error
      }
      setInitialImageQueryResult({ error: "Failed to analyze the image." });
      setSpectrogramQueryResult({
        error: "Failed to analyze the spectrogram.",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateClipResult = async (
    image: File | Blob,
    candidateLabels: string[],
    fallbacks: string[]
  ): Promise<string> => {
    try {
      const query: HuggingfaceResponse | null = await generateCLIP(image, { candidate_labels: candidateLabels });
      if (query && query.result) {
        return query.result.map((item: any) => item.label).join(", ");
      } else {
        return getRandomDescription(fallbacks);
      }
    } catch (error) {
      return getRandomDescription(fallbacks);
    }
  };

  return {
    result,
    initialImageQueryResult,
    spectrogramQueryResult,
    loading,
    songBlob,
    convertImage,
  };
};

export default useImageConverter;


