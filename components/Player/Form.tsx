import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { MusicIcon, HeartPulseIcon } from 'lucide-react'

export default function Component() {
  const [step, setStep] = useState(1)
  const [genre, setGenre] = useState('')
  const [feeling, setFeeling] = useState('')

  const genres = ['Lullaby', 'Classical', 'Electronic', 'Jazz', 'New Age', 'Ambient']
  const feelings = ['Joyful', 'Calm', 'Excited', 'Nervous', 'Hopeful', 'Overwhelmed']

  const handleNext = () => {
    if (step === 1 && genre) setStep(2)
    else if (step === 2 && feeling) {
      console.log('Selected genre:', genre, 'Selected feeling:', feeling)
      // Here you would typically move to the naming screen
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-black border-green-500 border-2 shadow-lg shadow-green-500/20">
        <CardHeader className="border-b border-green-500/30">
          <CardTitle className="text-green-500 text-center text-3xl font-bold">
            {step === 1 ? 'Choose Your Genre' : 'Express Your Feeling'}
          </CardTitle>
          <div className="text-green-500 text-center text-sm mt-2">Step {step} of 2</div>
        </CardHeader>
        <CardContent className="pt-6 pb-8 px-6">
          <div className="flex justify-center mb-6">
            {step === 1 ? (
              <MusicIcon className="text-green-500 w-16 h-16 animate-pulse" />
            ) : (
              <HeartPulseIcon className="text-green-500 w-16 h-16 animate-pulse" />
            )}
          </div>
          <h2 className="text-green-500 text-center mb-8 text-xl font-semibold">
            {step === 1 
              ? "Which musical genre best represents your pregnancy journey?" 
              : "How do you feel about your ultrasound experience?"}
          </h2>
          <RadioGroup 
            value={step === 1 ? genre : feeling} 
            onValueChange={step === 1 ? setGenre : setFeeling}
            className="grid grid-cols-2 gap-4"
          >
            {(step === 1 ? genres : feelings).map((option) => (
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
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            onClick={handleNext} 
            className="w-full bg-green-500 text-black hover:bg-green-600 py-6 text-lg rounded-full font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={step === 1 ? !genre : !feeling}
          >
            {step === 2 ? "Create My WombTune" : "Next"}
          </Button>
          <p className="text-green-500/70 text-center text-sm">
            {step === 1 
              ? "Choose the genre that resonates with your journey" 
              : "Select the emotion that best describes your experience"}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}