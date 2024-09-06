export interface HuggingfaceResponse {
  result: any;
}

const dataToBase64 = (data: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result && typeof reader.result === 'string') {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject("Failed to convert data to base64.");
      }
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(data);
  });
};

export const generateCLIP = async (
  data: Blob | File,
  parameters: { candidate_labels: string[] }
): Promise<HuggingfaceResponse | null> => {
  const API_URL = "https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32";
  const AUTHORIZATION_HEADER = "Bearer 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";
  const RETRY_DELAY = 5000; // 5 seconds

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const base64Image = await dataToBase64(data);

      if (!base64Image.match(/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/)) {
        throw new Error("Invalid base64 data");
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": AUTHORIZATION_HEADER,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: {
            image: base64Image
          },
          parameters: parameters
        })
      });

      if (response.status === 503) {
        const errorData = await response.json();
        if (errorData.error && errorData.error.includes("Model is currently loading")) {
          if (attempt === 0) {
            await delay(RETRY_DELAY);
            continue;
          }
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to query Hugging Face API. Status: ${response.status}, Error: ${errorText}`);
      }

      const result = await response.json();
      return { result };
    } catch (error) {
      if (attempt === 1) {
        return null;
      }
    }
  }

  return null;
};

