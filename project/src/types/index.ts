export interface ProcessedImage {
  id: string;
  originalFile: File;
  originalUrl: string;
  processedUrl: string;
  name: string;
  size: number;
  processed: boolean;
}

export interface UploadProgress {
  percentage: number;
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
  message: string;
}

export type Theme = 'light' | 'dark';