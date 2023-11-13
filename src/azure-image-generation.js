// src/azure-image-generation.js
import OpenAI from "openai";

// Function to check if the required environment variables are set
export const isConfigured = () => {
  return process.env.REACT_APP_OPENAI_API_KEY && process.env.REACT_APP_OPENAI_ORG;
};

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  organization: process.env.REACT_APP_OPENAI_ORG,
  dangerouslyAllowBrowser: true // ONLY for testing environments
});

const generateImage = async (prompt) => {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    console.log('Response:', response); // Esto imprimirá la respuesta completa
    if (response && response.data && response.data.length > 0) {
      console.log(response.data[0].url)
      return response.data[0].url; // Accede a la URL de esta manera
    } else {
      throw new Error('No image data found');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};


export default generateImage;
