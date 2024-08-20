// @ts-ignore

import { ImageToAudioOptions, LeftToRightRGBOptions } from "image-to-audio";
import { useState } from "react";

export type SoundCreaterParams = {
  url: string;
  method: string;
} & ImageToAudioOptions;

export type SoundCreaterProps = {
  initValues?: SoundCreaterParams;
  onSubmit?: (values: SoundCreaterParams) => void;
};

const SoundCreater: React.FC<SoundCreaterProps> = ({ initValues, onSubmit }) => {
  const [formValues, setFormValues] = useState<SoundCreaterParams>(initValues || {
    url: '',
    method: 'LeftToRightRGB',
    sampleRate: 8000,
    bpm: 60,
    beat: 1 / 4,
    maxFreq: 20000,
  });
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setFormValues({ ...formValues, url: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          required 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
        />
      </div>
      <button 
        type="submit" 
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Convert to Sound
      </button>
    </form>
  );
};

export default SoundCreater;