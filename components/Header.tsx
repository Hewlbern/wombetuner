import React from 'react';
import Image from 'next/image';

// Header Component
export const Header = () => {
    return (
        <header className="flex flex-col items-center space-y-1">
            <div className="flex items-center justify-center w-24 h-24 rounded-full overflow-hidden">
                <Image
                    src="/logo_small.png" // Make sure the path is correct
                    alt="Logo"
                    width={256} // Adjust based on your specific needs
                    height={256} // Adjust based on your specific needs
                    priority // Optionally ensures the image is preloaded
                />
            </div>
            <h1 className="text-xl text-emerald-400 font-bold">wombtunes</h1>
        </header>
    );
};