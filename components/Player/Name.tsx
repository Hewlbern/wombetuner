import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MusicIcon, WormIcon } from 'lucide-react'

export default function Component() {
  const [tuneName, setTuneName] = useState('')

  const handleContinue = () => {
    if (tuneName) {
      console.log('WombTune named:', tuneName)
    } else {
      console.log('Continuing unnamed')
    }
    // Here you would typically move to the next step or submit the form
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-black border-green-500 border-2 shadow-lg shadow-green-500/20">
        <CardHeader className="border-b border-green-500/30">
          <CardTitle className="text-green-500 text-center text-3xl font-bold">
            Name Your WombTune
          </CardTitle>
          <div className="text-green-500 text-center text-sm mt-2">Step 2 of 2</div>
        </CardHeader>
        <CardContent className="pt-6 pb-8 px-6">
          <div className="flex justify-center mb-6">
            <WormIcon className="text-green-500 w-16 h-16 animate-pulse" />
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
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            onClick={handleContinue} 
            className="w-full bg-green-500 text-black hover:bg-green-600 py-6 text-lg rounded-full font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {tuneName ? 'Continue' : 'Continue unnamed'}
          </Button>
          <p className="text-green-500/70 text-center text-sm">
            {tuneName ? 'Great name choice!' : 'You can always name your tune later'}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}