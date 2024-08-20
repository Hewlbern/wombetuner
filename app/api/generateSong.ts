  // api/generateSong.ts
  export interface HuggingfaceResponse {
    blob: Blob;
  }
  
  export const generateSong = async (description: string): Promise<HuggingfaceResponse | null> => {
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/facebook/musicgen-small", {
        method: "POST",
        headers: {
          "Authorization": `Bearer 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`,
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
  
