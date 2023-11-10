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
      model: "dall-e-3", // The model to use
      prompt: prompt, // The text prompt for image generation
      n: 1, // Number of images to generate
      size: "1024x1024", // Size of the images
      // You can add more parameters as needed
    });

    // Assuming the API response is like the one provided in the documentation
    return response.data.data[0].url; // Adjust according to the actual response structure
  } catch (error) {
    console.error('Error generating image:', error);
    throw error; // Propagate the error to handle it higher up in the chain
  }
};

export default generateImage;
