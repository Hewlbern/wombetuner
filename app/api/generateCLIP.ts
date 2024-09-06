export interface HuggingfaceResponse {
  result: any;
}

const dataToBase64 = (data: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result && typeof reader.result === 'string') {
        // Remove the data URL prefix
        const base64 = reader.result.split(',')[1];
        console.log("Base64 prefix:", base64.substring(0, 30)); // Log the first 30 characters
        console.log("Full base64 length:", base64.length);
        console.log("Is base64 valid:", /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(base64));
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
      console.log(`Attempt ${attempt + 1} to query Hugging Face API...`);
      console.log("Input data type:", data.type);
      console.log("Input data size:", data.size, "bytes");
      console.log("Is input data a File?", data instanceof File);
      console.log("Is input data a Blob?", data instanceof Blob);

      console.log("Converting data to base64...");
      const base64Image = await dataToBase64(data);
      console.log("Base64 conversion successful. Length:", base64Image.length);

      // Add a check for valid base64 data
      if (!base64Image.match(/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/)) {
        throw new Error("Invalid base64 data");
      }

      console.log("Sending Hugging Face API query...");
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
            console.log(`Model is loading. Retrying in ${RETRY_DELAY / 1000} seconds...`);
            await delay(RETRY_DELAY);
            continue;
          }
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to query Hugging Face API. Status: ${response.status}, Error: ${errorText}`);
        throw new Error(`Failed to query Hugging Face API. Status: ${response.status}, Error: ${errorText}`);
      }

      const result = await response.json();
      console.log("Hugging Face API query successful. Result:", result);
      return { result };
    } catch (error) {
      console.error("Error in generateCLIP:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      if (attempt === 1) {
        console.error("Max retries reached. Giving up.");
        return null;
      }
    }
  }

  return null;
};

