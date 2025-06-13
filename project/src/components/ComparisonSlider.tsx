import React, { useState, useRef } from 'react';
import { Download, RotateCcw, Move } from 'lucide-react';
import type { ProcessedImage } from '../types';

interface ComparisonSliderProps {
  image: ProcessedImage;
  onDownload: () => void;
  onReset: () => void;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ 
  image, 
  onDownload, 
  onReset 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updateSliderPosition(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Image Comparison Container */}
      <div 
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none bg-gray-100 dark:bg-gray-800"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Original Image */}
        <div className="relative w-full h-96 md:h-[500px]">
          <img
            src={image.originalUrl}
            alt="Original"
            className="absolute inset-0 w-full h-full object-contain"
            draggable={false}
          />
          
          {/* Processed Image Overlay */}
          <div 
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={image.processedUrl}
              alt="Processed"
              className="absolute inset-0 w-full h-full object-contain"
              style={{ width: `${10000 / sliderPosition}%` }}
              draggable={false}
            />
          </div>

          {/* Slider Line */}
          <div 
            className="absolute top-0 h-full w-1 bg-white shadow-lg transition-all duration-150"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Slider Handle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 hover:scale-110 transition-transform duration-200">
              <Move className="w-5 h-5 text-gray-600" />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 text-white text-sm rounded-lg">
            Original
          </div>
          <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white text-sm rounded-lg">
            Background Removed
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
        >
          <RotateCcw className="w-5 h-5" />
          Process Another
        </button>
        
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <Download className="w-5 h-5" />
          Download Result
        </button>
      </div>

      {/* Image Info */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {image.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {(image.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
    </div>
  );
};