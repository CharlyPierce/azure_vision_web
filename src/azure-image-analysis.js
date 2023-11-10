// src/azure-image-analysis.js
import axios from 'axios';

// Function to check if the required environment variables are set
export const isConfigured = () => {
  return process.env.REACT_APP_AZURE_ENDPOINT && process.env.REACT_APP_AZURE_SUBSCRIPTION_KEY;
};

const analyzeImage = async (imageUrl) => {
    const endpointBase = process.env.REACT_APP_AZURE_ENDPOINT;
    const apiRoute = '/vision/v3.2/analyze';
    const subscriptionKey = process.env.REACT_APP_AZURE_SUBSCRIPTION_KEY;

    const headers = {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Content-Type': 'application/json'
    };

    const params = {
      'api-version': '2023-02-01-preview',
      'visualFeatures': 'Categories,Description,Color',
      'details': '',
      'language': 'en',
    };

    const body = {
      url: imageUrl,
    };

    try {
      const response = await axios.post(`${endpointBase}${apiRoute}`, body, { headers, params });
      return response.data;
    } catch (error) {
      console.error('Error calling Azure Image Analysis Service:', error);
      return error.response?.data || error;
    }
};

export default analyzeImage;
