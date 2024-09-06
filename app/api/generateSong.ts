

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
      const replicateApiToken = process.env.REPLICATE_API_TOKEN;
      if (!replicateApiToken) {
        throw new Error('REPLICATE_API_TOKEN is not set');
      }

      const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${replicateApiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: "671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
          input: input,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Assuming the API returns a URL in the output field
      if (data.output && typeof data.output === 'string') {
        return { url: data.output };
      } else {
        throw new Error('Unexpected output format from Replicate API');
      }
    } catch (error) {
      console.error("Error generating melody:", error);
      return null;
    }
  };

  
