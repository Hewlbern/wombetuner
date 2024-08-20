import React from 'react';
import Image from 'next/image';
import { PlusIcon } from "@/components/PlusIcon";
import { Header } from "@/components/Header";

interface SonogramSelectorProps {
  onSonogramClick: (imageSrc: string) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const sonograms = [
  { id: 1, image: "/ultrababy2.jpg" },
  { id: 2, image: "/ultrasound1.jpg" },
];

const SonogramSelector: React.FC<SonogramSelectorProps> = ({
  onSonogramClick,
  onImageChange
}) => {
  return (
    <div className="p-4">
                  <Header />

      <p className="text-lg text-green-400 text-center">
        Start by selecting a sonogram, or upload your own.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"> 
        {sonograms.map((sonogram) => (
          <div key={sonogram.id} className="border border-green-400 rounded overflow-hidden hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer" onClick={() => onSonogramClick(sonogram.image)}>
            <Image
              src={sonogram.image}
              alt={`Sonogram ${sonogram.id}`}
              layout="responsive"
              width={300} // This width corresponds to the container size
              height={400} // This height ensures the aspect ratio is maintained
            />
          </div>
        ))}
        <label htmlFor="upload" className="flex items-center justify-center border border-green-400 rounded p-1 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out">
          <PlusIcon className="w-10 h-10 text-green-400" />
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default SonogramSelector;