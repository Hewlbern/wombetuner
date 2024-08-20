import React from 'react';
import Image from 'next/image';

// LoadingIndicator Component
const LoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-20 h-20"> {/* Ensure proper sizing for the Image component */}
        <Image
          src="/Tail-3s-200px.svg" // Make sure the SVG file is located in the public directory
          alt="Loading"
          layout="fill" // This will take up the entire size of the container
          objectFit="contain" // Ensures the image is resized appropriately within the container
        />
      </div>
      <p className="text-emerald-500 mt-2">loading your wombtune...</p> 
    </div>
  );
};

export default LoadingIndicator