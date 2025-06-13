import React, { useState, useCallback, useEffect } from 'react';
import { Scissors, Upload, Download, AlertCircle } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { DropZone } from './components/DropZone';
import { ProgressBar } from './components/ProgressBar';
import { ComparisonSlider } from './components/ComparisonSlider';
import { ThemeToggle } from './components/ThemeToggle';
import { ApiStatus } from './components/ApiStatus';
import { SampleImages } from './components/SampleImages';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { useTheme } from './hooks/useTheme';
import { backgroundRemovalService } from './services/api';
import type { ProcessedImage, UploadProgress } from './types';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentSection, setCurrentSection] = useState('home');
  const [progress, setProgress] = useState<UploadProgress>({
    percentage: 0,
    status: 'idle',
    message: ''
  });
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);

  // Real background removal processing using API
  const processImage = useCallback(async (file: File): Promise<string> => {
    const result = await backgroundRemovalService.removeBackground(file);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to process image');
    }
    
    return result.data || '';
  }, []);

  const handleFileSelect = useCallback(async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setProcessedImage(null);
    setProgress({ percentage: 0, status: 'uploading', message: 'Uploading image...' });

    // Simulate upload progress
    for (let i = 0; i <= 30; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress({ percentage: i, status: 'uploading', message: 'Uploading image...' });
    }

    setProgress({ percentage: 40, status: 'processing', message: 'Removing background...' });

    // Simulate processing progress
    for (let i = 50; i <= 90; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProgress({ percentage: i, status: 'processing', message: 'Removing background...' });
    }

    try {
      const originalUrl = URL.createObjectURL(file);
      const processedUrl = await processImage(file);

      const processed: ProcessedImage = {
        id: Date.now().toString(),
        originalFile: file,
        originalUrl,
        processedUrl,
        name: file.name,
        size: file.size,
        processed: true
      };

      setProgress({ percentage: 100, status: 'completed', message: 'Complete!' });
      
      setTimeout(() => {
        setProcessedImage(processed);
        setProgress({ percentage: 0, status: 'idle', message: '' });
      }, 500);

    } catch (error) {
      console.error('Processing error:', error);
      setProgress({ 
        percentage: 0, 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Processing failed' 
      });
    }
  }, [processImage]);

  const handleSampleImageSelect = useCallback(async (imageUrl: string, imageName: string) => {
    try {
      // Fetch the image and convert to File object
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `${imageName}.jpg`, { type: 'image/jpeg' });
      
      // Process the sample image
      await handleFileSelect(file);
    } catch (error) {
      console.error('Failed to load sample image:', error);
    }
  }, [handleFileSelect]);

  const handleDownload = useCallback(() => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.href = processedImage.processedUrl;
    link.download = `processed_${processedImage.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [processedImage]);

  const handleReset = useCallback(() => {
    if (processedImage) {
      URL.revokeObjectURL(processedImage.originalUrl);
      if (processedImage.processedUrl.startsWith('blob:')) {
        URL.revokeObjectURL(processedImage.processedUrl);
      }
    }
    setProcessedImage(null);
    setProgress({ percentage: 0, status: 'idle', message: '' });
  }, [processedImage]);

  // Listen for sample image selection events
  useEffect(() => {
    const handleSampleImageEvent = (event: CustomEvent) => {
      const { file } = event.detail;
      handleFileSelect(file);
    };

    window.addEventListener('sampleImageSelected', handleSampleImageEvent as EventListener);
    
    return () => {
      window.removeEventListener('sampleImageSelected', handleSampleImageEvent as EventListener);
    };
  }, [handleFileSelect]);

  const isProcessing = progress.status === 'uploading' || progress.status === 'processing';

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return (
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10">
                  <Scissors className="w-12 h-12 text-blue-500" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
                Background
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  {' '}Remover
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                Remove backgrounds from your images instantly with AI-powered precision. 
                Upload, process, and download in seconds.
              </p>
              
              {/* API Status */}
              <div className="flex justify-center">
                <ApiStatus />
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              {!processedImage && !isProcessing && (
                <DropZone 
                  onFileSelect={handleFileSelect}
                  progress={progress}
                  disabled={isProcessing}
                />
              )}

              {isProcessing && (
                <ProgressBar progress={progress} />
              )}

              {processedImage && (
                <ComparisonSlider
                  image={processedImage}
                  onDownload={handleDownload}
                  onReset={handleReset}
                />
              )}

              {/* Error Display */}
              {progress.status === 'error' && (
                <div className="w-full max-w-md mx-auto p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Error</span>
                  </div>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {progress.message}
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>

            {/* Sample Images Section */}
            {!processedImage && !isProcessing && (
              <div className="mt-20">
                <SampleImages onImageSelect={handleSampleImageSelect} />
              </div>
            )}

            {/* Features Section */}
            {!processedImage && !isProcessing && (
              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center p-6 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Easy Upload</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Drag & drop or click to upload your images
                  </p>
                </div>

                <div className="text-center p-6 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Scissors className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">AI Processing</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Advanced AI removes backgrounds precisely
                  </p>
                </div>

                <div className="text-center p-6 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Instant Download</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Download your processed image immediately
                  </p>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <Navigation 
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        theme={theme}
      />
      
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {renderCurrentSection()}
      </div>
    </div>
  );
}

export default App;