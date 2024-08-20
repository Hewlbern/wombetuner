// Home.tsx
"use client";
import React, { useState } from "react";
import useImageConverter from "./useImageConverter";
import { Footer } from "@/components/Footer";
import SoundPlayer from "@/components/Player/SoundPlayer";
import SonogramSelector from "@/components/SonogramSelector";
import WombTuneCreator from "@/components/Player/WombTuneCreator";

const Home = () => {
  const {
    result,
    initialImageQueryResult,
    spectrogramQueryResult,
    loading,
    songBlob,
    convertImage,
  } = useImageConverter();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [creatorStep, setCreatorStep] = useState(0); // 0: Sonogram selection, 1: WombTune Creator, 2: Song generation
  const [wombTuneData, setWombTuneData] = useState<{
    heartRate: number;
    genre: string;
    feeling: string;
    name: string;
  } | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setSelectedImage(file);
    setCreatorStep(1); // Move to WombTune Creator step
  };

  const handleSonogramClick = async (imageSrc: string) => {
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    const file = new File([blob], "sonogram.png", { type: "image/png" });
    setSelectedImage(file);
    setCreatorStep(1); // Move to WombTune Creator step
  };

  const handleWombTuneComplete = async (data: {
    heartRate: number;
    genre: string;
    feeling: string;
    name: string;
  }) => {
    setWombTuneData(data);
    setCreatorStep(2); // Move to song generation step
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      await convertImage(url, selectedImage, data);
    }
  };

  return (
    <>
      <main className="flex flex-col items-center mt-10">
        {creatorStep === 0 && (
          <>
            <SonogramSelector
              onSonogramClick={handleSonogramClick}
              onImageChange={handleImageChange}
            />
          </>
        )}
        {creatorStep === 1 && (
          <WombTuneCreator onComplete={handleWombTuneComplete} />
        )}
        {creatorStep === 2 && result && (
          <SoundPlayer
            src={result.audioBlob}
            initialImageQueryResult={initialImageQueryResult}
            spectrogramQueryResult={spectrogramQueryResult}
            songBlob={songBlob}
            loadingSong={loading}
            wombTuneData={wombTuneData}
          />
        )}
        <Footer />
      </main>
    </>
  );
};

export default Home;
