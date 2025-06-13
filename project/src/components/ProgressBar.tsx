import React from 'react';
import { Loader2 } from 'lucide-react';
import type { UploadProgress } from '../types';

interface ProgressBarProps {
  progress: UploadProgress;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  if (progress.status === 'idle') return null;

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {progress.message}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>
      
      <div className="text-right mt-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {progress.percentage}%
        </span>
      </div>
    </div>
  );
};