import Replicate from "replicate";

// api/generateSong.ts
  export interface HuggingfaceResponse {
    blob: Blob;
  }
  
  export const generateSong = async (description: string): Promise<HuggingfaceResponse | null> => {
    try {
      const huggingFaceToken = process.env.HUGGINGFACE_API_TOKEN || "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";
      const response = await fetch("https://api-inference.huggingface.co/models/facebook/musicgen-small", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${huggingFaceToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: description })
      });
  
      if (!response.ok) throw new Error('Failed to generate song');
  
      const blob = await response.blob();
      return { blob };
    } catch (error) {
      console.error("Error generating song:", error);
      return null;
    }
  };
  

  export interface ReplicateResponse {
    url: string;
  }

  export interface ReplicateInput {
    prompt: string;
    input_audio?: string;
    duration?: number;
    continuation?: boolean;
    model_version?: "stereo-melody-large" | "stereo-large" | "melody-large" | "large";
    output_format?: "wav" | "mp3";
    normalization_strategy?: "loudness" | "clip" | "peak" | "rms";
  }

  export const generateMelody = async (input: ReplicateInput): Promise<ReplicateResponse | null> => {
    try {
      const replicate = new Replicate();
      
      const output = await replicate.run(
        "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
        { input }
      );

      if (typeof output === 'string') {
        return { url: output };
      } else {
        throw new Error('Unexpected output format from Replicate API');
      }
    } catch (error) {
      console.error("Error generating melody:", error);
      return null;
    }
  };

  
