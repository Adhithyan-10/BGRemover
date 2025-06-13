import React, { useCallback, useState } from 'react';
import { Upload, ImageIcon, X } from 'lucide-react';
import type { UploadProgress } from '../types';

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  progress: UploadProgress;
  disabled?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFileSelect, progress, disabled }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onFileSelect(imageFile);
    }
  }, [onFileSelect, disabled]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const isProcessing = progress.status === 'uploading' || progress.status === 'processing';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300
          ${isDragOver && !disabled
            ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 scale-105'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/50'}
        `}
      >
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className={`
              p-6 rounded-full transition-all duration-300
              ${isDragOver && !disabled
                ? 'bg-blue-100 dark:bg-blue-900/30 scale-110'
                : 'bg-gray-100 dark:bg-gray-800'
              }
            `}>
              {isProcessing ? (
                <Upload className="w-12 h-12 text-blue-500 animate-bounce" />
              ) : (
                <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              {isProcessing ? 'Processing...' : 'Drop your image here'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              or click to browse files
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Supports PNG, JPG, JPEG up to 10MB
            </p>
          </div>

          {!disabled && (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="file-input"
                disabled={disabled}
              />
              <label
                htmlFor="file-input"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Upload className="w-5 h-5" />
                Upload File
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};