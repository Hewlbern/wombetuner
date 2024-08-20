
"use client"

import { useState } from "react"

export default function  Landing() {
  const [sonograms, setSonograms] = useState([
    { id: 1, image: "/placeholder.svg?height=200&width=200" },
    { id: 2, image: "/placeholder.svg?height=200&width=200" },
  ])
  const [uploadedSonogram, setUploadedSonogram] = useState(null)
  const handleUpload = (event:any) => {
    const file = event.target.files[0]
    setUploadedSonogram(file)
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-green-400 p-4">
      <header className="flex flex-col items-center space-y-2 mt-4">
        <div className="flex items-center justify-center w-12 h-12 bg-green-400 rounded-full">
          <WormIcon className="w-8 h-8 text-black" />
        </div>
        <h1 className="text-2xl font-bold">wombtunes</h1>
      </header>
      <main className="flex flex-col items-center mt-10 space-y-6">
        <p className="text-lg">Start by selecting a sonogram, or upload your own.</p>
        <div className="grid grid-cols-3 gap-2 max-w-md">
          {sonograms.map((sonogram) => (
            <img
              key={sonogram.id}
              src="/placeholder.svg"
              alt={`Sonogram ${sonogram.id}`}
              className="border border-green-400 p-1 w-[200px] h-[200px]"
            />
          ))}
          <label
            htmlFor="upload"
            className="flex items-center justify-center w-full h-full border border-green-400 p-1 cursor-pointer"
          >
            <PlusIcon className="w-8 h-8 text-green-400" />
            <input id="upload" type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>
        {uploadedSonogram && (
          <div>
            <img
              src="/placeholder.svg"
              alt="Uploaded Sonogram"
              className="border border-green-400 p-1 w-[200px] h-[200px]"
            />
            <button onClick={() => {}} className="mt-4 px-4 py-2 bg-green-400 text-black rounded-md">
              Play Sonogram
            </button>
          </div>
        )}
      </main>
      <footer className="flex flex-col items-center mt-auto mb-10">
        <a href="#" className="text-lg">
          About the project
        </a>
      </footer>
    </div>
  )
}

function PlusIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function WormIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 12-1.5 3" />
      <path d="M19.63 18.81 22 20" />
      <path d="M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z" />
    </svg>
  )
}
