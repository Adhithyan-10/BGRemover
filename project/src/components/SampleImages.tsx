import React from 'react';
import { Download, Eye } from 'lucide-react';

interface SampleImage {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
}

interface SampleImagesProps {
  onImageSelect: (imageUrl: string, imageName: string) => void;
}

export const SampleImages: React.FC<SampleImagesProps> = ({ onImageSelect }) => {
  const sampleImages: SampleImage[] = [
    {
      id: '1',
      name: 'Portrait Photo',
      url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Professional headshot with clean background',
      category: 'Portrait'
    },
    {
      id: '2',
      name: 'Product Shot',
      url: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Sneaker product photography',
      category: 'Product'
    },
    {
      id: '3',
      name: 'Fashion Model',
      url: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Fashion photography with detailed clothing',
      category: 'Fashion'
    },
    {
      id: '4',
      name: 'Pet Photo',
      url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Cute dog portrait for testing animal detection',
      category: 'Animals'
    },
    {
      id: '5',
      name: 'Business Portrait',
      url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Professional business headshot',
      category: 'Portrait'
    },
    {
      id: '6',
      name: 'Product Display',
      url: 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Watch product with complex background',
      category: 'Product'
    }
  ];

  const handleImageClick = async (imageUrl: string, imageName: string) => {
    try {
      // Fetch the image and convert to File object
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `${imageName}.jpg`, { type: 'image/jpeg' });
      
      // Call the parent component's file select handler
      onImageSelect(imageUrl, imageName);
      
      // Create a custom event to trigger the file processing
      const event = new CustomEvent('sampleImageSelected', { 
        detail: { file, url: imageUrl, name: imageName } 
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Failed to load sample image:', error);
    }
  };

  const categories = [...new Set(sampleImages.map(img => img.category))];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Try Sample Images
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Test our background removal tool with these sample images. Click on any image to process it instantly.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <span
            key={category}
            className="px-4 py-2 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-white/20 dark:border-white/10"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Sample Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleImages.map((image) => (
          <div
            key={image.id}
            className="group relative bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => handleImageClick(image.url, image.name)}
          >
            {/* Image */}
            <div className="aspect-square overflow-hidden">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-sm">
                      {image.name}
                    </h3>
                    <p className="text-white/80 text-xs mt-1">
                      {image.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                {image.category}
              </span>
            </div>

            {/* Try Button */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-full transition-colors">
                Try Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Usage Instructions */}
      <div className="text-center p-6 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
          How to Use Sample Images
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Click on any sample image above to automatically process it with our background removal tool. 
          Perfect for testing the functionality before uploading your own images.
        </p>
      </div>
    </div>
  );
};