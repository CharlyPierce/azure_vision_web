import React, { useState, useEffect } from 'react';
import './index.css';
import './App.css';
import analyzeImage, { isConfigured as isAnalysisConfigured } from './azure-image-analysis'; // Import the function and isConfigured
import generateImage, { isConfigured as isGenerationConfigured } from './azure-image-generation'; // Import the function and isConfigured


function App() {
  const [inputValue, setInputValue] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [isConfigured, setIsConfigured] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  useEffect(() => {
    // Verifica si los servicios de Azure AI están configurados
    if (!isAnalysisConfigured() || !isGenerationConfigured()) {
      setIsConfigured(false);
    }
  }, []);

  if (!isConfigured) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Computer Vision</h1>
          <div className="warning-message">
            Warning: Azure AI services are not configured properly. Please check your environment variables.
          </div>
        </header>
      </div>
    );
  }


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAnalyzeClick = async () => {
    setIsAnalyzing(true); // Activar solo el indicador de generación
    try {
      const result = await analyzeImage(inputValue);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing image:', error);
    }
    setIsAnalyzing(false); // Desactivar el indicador de análisis
  };

  const handleGenerateClick = async () => {
    console.log('Generate:', inputValue);
    setIsGenerating(true); // Activar solo el indicador de generación
    try {
      const imageUrl = await generateImage(inputValue); // Solicita la generación de la imagen
      setGeneratedImageUrl(imageUrl); // Actualiza el estado con la URL de la imagen generada
    } catch (error) {
      console.error('Error generating image:', error); // Manejo de error
    } finally {
      setIsGenerating(false); // Desactivar el indicador de generación
    }
  };
  
  const DisplayResults = () => {
    return (
      <div className="results-main-container">
        {analysisResult && (
          <>
            <div className="image-container">
              <img src={inputValue} alt="Analyzed" />
            </div>
            <div className="json-container">
              <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
            </div>
          </>
        )}

        {generatedImageUrl && (
          <div className="image-container" onClick={toggleZoom}>
            <img 
              src={generatedImageUrl} 
              alt="Generated Content" 
              className={isZoomed ? 'zoomed-in' : ''}
            />
          </div>
        )}
      </div>
    );
  };
  


  return (
    <div className="App">
      <header className="App-header">
        <h1>Computer Vision</h1>
        <div className="input-and-buttons-container">
          <input 
            type="text" 
            placeholder="Enter URL to analyze or textual prompt to generate an image" 
            value={inputValue} 
            onChange={handleInputChange} 
          />
          <div className="buttons-container">
            <button onClick={handleAnalyzeClick} disabled={isAnalyzing || isGenerating}>
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </button>
            <button onClick={handleGenerateClick} disabled={isAnalyzing || isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
        <DisplayResults />
      </header>
    </div>
  );
}
export default App;
