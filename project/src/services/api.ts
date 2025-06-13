interface RemoveBgResponse {
  success: boolean;
  data?: string; // base64 image data
  error?: string;
}

interface ApiConfig {
  apiKey: string;
  baseUrl: string;
}

class BackgroundRemovalService {
  private config: ApiConfig;

  constructor() {
    this.config = {
      apiKey: import.meta.env.VITE_REMOVE_BG_API_KEY || 'dummy_api_key_replace_with_real_one',
      baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.remove.bg/v1.0'
    };
  }

  async removeBackground(imageFile: File): Promise<RemoveBgResponse> {
    try {
      // Check if we're using dummy API key
      if (this.config.apiKey === 'dummy_api_key_replace_with_real_one') {
        return this.simulateBackgroundRemoval(imageFile);
      }

      const formData = new FormData();
      formData.append('image_file', imageFile);
      formData.append('size', 'auto');

      const response = await fetch(`${this.config.baseUrl}/removebg`, {
        method: 'POST',
        headers: {
          'X-Api-Key': this.config.apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.errors?.[0]?.title || `API Error: ${response.status}`);
      }

      // Convert blob response to base64
      const blob = await response.blob();
      const base64 = await this.blobToBase64(blob);

      return {
        success: true,
        data: base64
      };

    } catch (error) {
      console.error('Background removal failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private async simulateBackgroundRemoval(imageFile: File): Promise<RemoveBgResponse> {
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, return the original image
    // In a real scenario with proper API key, this would be the processed image
    const base64 = await this.fileToBase64(imageFile);
    
    return {
      success: true,
      data: base64
    };
  }

  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Method to check if API key is configured
  isApiKeyConfigured(): boolean {
    return this.config.apiKey !== 'dummy_api_key_replace_with_real_one' && 
           this.config.apiKey.length > 0;
  }

  // Method to get API status
  getApiStatus(): { configured: boolean; usingDummy: boolean } {
    const configured = this.isApiKeyConfigured();
    return {
      configured,
      usingDummy: !configured
    };
  }
}

export const backgroundRemovalService = new BackgroundRemovalService();
export type { RemoveBgResponse };