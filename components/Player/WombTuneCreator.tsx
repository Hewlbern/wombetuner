'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { MusicIcon, HeartPulseIcon, WormIcon } from 'lucide-react'

interface WombTuneCreatorProps {
  onComplete: (data: {
    heartRate: number;
    genre: string;
    feeling: string;
    name: string;
  }) => void;
}

export default function WombTuneCreator({ onComplete }: WombTuneCreatorProps) {
  const [step, setStep] = useState(1)
  const [heartRate, setHeartRate] = useState(140)
  const [genre, setGenre] = useState('')
  const [feeling, setFeeling] = useState('')
  const [tuneName, setTuneName] = useState('')

  const genres = ['Lullaby', 'Classical', 'Electronic', 'Jazz', 'New Age', 'Ambient']
  const feelings = ['Joyful', 'Calm', 'Excited', 'Nervous', 'Hopeful', 'Overwhelmed']

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      onComplete({
        heartRate,
        genre,
        feeling,
        name: tuneName || 'Unnamed WombTune'
      })
    }
  }

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="flex justify-center mb-6">
              <HeartPulseIcon className="text-fuchsia-500 w-16 h-16 animate-pulse" />
            </div>
            <h2 className="text-green-500 text-center mb-8 text-xl font-semibold">
              Set your baby`s heart rate
            </h2>
            <div className="space-y-4">
              <Slider
                value={[heartRate]}
                onValueChange={(value) => setHeartRate(value[0])}
                min={80}
                max={220}
                step={1}
                className="w-full text-green-300 font-bold bg-fuchsia-800"
              />
              <div className="text-green-500 text-center text-2xl font-bold">
                {heartRate} BPM
              </div>
            </div>
          </>
        )
      case 2:
      case 3:
        return (
          <>
            <div className="flex justify-center mb-6">
              {step === 2 ? (
                <MusicIcon className="text-fuchsia-500 w-16 h-16 animate-pulse" />
              ) : (
                <HeartPulseIcon className="text-fuchsia-500 w-16 h-16 animate-pulse" />
              )}
            </div>
            <h2 className="text-green-500 text-center mb-8 text-xl font-semibold">
              {step === 2 
                ? "Which musical genre best represents your pregnancy journey?" 
                : "How do you feel about your ultrasound experience?"}
            </h2>
            <RadioGroup 
              value={step === 2 ? genre : feeling} 
              onValueChange={step === 2 ? setGenre : setFeeling}
              className="grid grid-cols-2 gap-4"
            >
              {(step === 2 ? genres : feelings).map((option) => (
                <div key={option} className="flex items-center">
                  <RadioGroupItem 
                    value={option} 
                    id={option} 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor={option}
                    className="flex-1 border border-green-500 rounded-full p-3 cursor-pointer text-green-500 peer-aria-checked:bg-green-500 peer-aria-checked:text-black transition-all duration-300 ease-in-out text-center hover:bg-green-500/20"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </>
        )
      case 4:
        return (
          <>
            <div className="flex justify-center mb-6">
              <WormIcon className="text-fuchsia-500 w-16 h-16 animate-pulse" />
            </div>
            <h2 className="text-green-500 text-center mb-8 text-xl font-semibold">
              What would you like to name your WombTune?
            </h2>
            <div className="relative">
              <Input
                type="text"
                value={tuneName}
                onChange={(e) => setTuneName(e.target.value)}
                className="bg-transparent border-green-500 text-green-500 placeholder-green-700 pl-10 pr-4 py-3 text-lg rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter name here"
              />
              <MusicIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-black border-green-500 border-2 shadow-lg shadow-green-500/20">
        <CardHeader className="border-b border-green-500/30">
          <CardTitle className="text-green-500 text-center text-3xl font-bold">
            {step === 1 ? 'Set Heart Rate' : 
             step === 2 ? 'Choose Your Genre' : 
             step === 3 ? 'Express Your Feeling' : 
             'Name Your WombTune'}
          </CardTitle>
          <div className="text-green-500 text-center text-sm mt-2">Step {step} of 4</div>
        </CardHeader>
        <CardContent className="pt-6 pb-8 px-6">
          {getStepContent()}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            onClick={handleNext} 
            className="w-full bg-green-500 text-black hover:bg-green-600 py-6 text-lg rounded-full font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={(step === 2 && !genre) || (step === 3 && !feeling)}
          >
            {step === 4 ? (tuneName ? 'Create My WombTune' : 'Create Unnamed WombTune') : 'Next'}
          </Button>
          <p className="text-green-500/70 text-center text-sm">
            {step === 1 
              ? "Adjust the slider to match your baby's heart rate"
              : step === 2
                ? "Choose the genre that resonates with your journey" 
                : step === 3
                  ? "Select the emotion that best describes your experience"
                  : tuneName ? 'Great name choice!' : 'You can always name your tune later'}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}