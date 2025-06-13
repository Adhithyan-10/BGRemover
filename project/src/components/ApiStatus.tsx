import React from 'react';
import { AlertCircle, CheckCircle, Key } from 'lucide-react';
import { backgroundRemovalService } from '../services/api';

export const ApiStatus: React.FC = () => {
  const apiStatus = backgroundRemovalService.getApiStatus();

  if (apiStatus.configured) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm">
        <CheckCircle className="w-4 h-4" />
        <span>API Connected</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg text-sm">
      <AlertCircle className="w-4 h-4" />
      <span>Demo Mode - Replace API Key</span>
    </div>
  );
};