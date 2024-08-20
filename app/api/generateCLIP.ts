export interface HuggingfaceResponse {
  result: any;
}

const blobToFile = (blob: Blob, name: string): File => {
  return new File([blob], name, { type: blob.type, lastModified: Date.now() });
};

const dataToBase64 = (data: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const base64String = reader.result.toString().replace(/^data:.+;base64,/, '');
        resolve(base64String);
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
  parameters: object
): Promise<HuggingfaceResponse | null> => {
  const API_URL = "https://api-inference.huggingface.co/models/openai/clip-vit-large-patch14";
  const AUTHORIZATION_HEADER = "Bearer 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";

  try {
    const fileName = (data instanceof File) ? data.name : "temp.jpeg";
    const fileData = (data instanceof File) ? data : blobToFile(data, fileName);
    console.log("Converting data to base64...");
    const base64Image = await dataToBase64(fileData);
    console.log("Base64 conversion successful.");
    const fullBase64Image = `data:image/jpeg;base64,${base64Image}`;

    console.log("Sending Hugging Face API query...");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": AUTHORIZATION_HEADER,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: fullBase64Image,
        parameters
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to query Hugging Face API. Status: ${response.status}, Error: ${errorText}`);
      throw new Error(`Failed to query Hugging Face API. Status: ${response.status}, Error: ${errorText}`);
    }

    const result = await response.json();
    console.log("Hugging Face API query successful. Result:", result);
    return { result };
  } catch (error) {
    console.error("Error querying Hugging Face API:", error);
    return null;
  }
};