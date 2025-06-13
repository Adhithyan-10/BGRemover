import React from 'react';
import { Scissors, Zap, Shield, Globe, Star, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Scissors,
      title: 'AI-Powered Precision',
      description: 'Advanced machine learning algorithms ensure accurate background removal with fine detail preservation.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process images in seconds with our optimized API integration and efficient processing pipeline.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your images are processed securely and never stored on our servers. Complete privacy guaranteed.'
    },
    {
      icon: Globe,
      title: 'Universal Format Support',
      description: 'Works with all major image formats including PNG, JPG, JPEG, and more up to 10MB.'
    }
  ];

  const stats = [
    { number: '1M+', label: 'Images Processed' },
    { number: '50K+', label: 'Happy Users' },
    { number: '99.9%', label: 'Accuracy Rate' },
    { number: '24/7', label: 'Available' }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
            <Scissors className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white">
          About Background Remover
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          We're revolutionizing image editing with AI-powered background removal technology. 
          Our mission is to make professional-quality image processing accessible to everyone, 
          from content creators to e-commerce businesses.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10"
          >
            <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-2">
              {stat.number}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Why Choose Our Tool?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Built with cutting-edge technology and user experience in mind
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <Icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technology Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Powered by Advanced Technology
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Machine Learning Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our background removal technology is powered by state-of-the-art deep learning models 
                trained on millions of images. This ensures precise edge detection and natural-looking results 
                across various image types and complexities.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Cloud-Based Processing
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Leveraging powerful cloud infrastructure, we can process images quickly and efficiently 
                without requiring any software installation. Your images are processed securely and 
                results are delivered instantly.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                  AI-Powered Engine
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Continuously learning and improving
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center space-y-6 p-8 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10">
        <div className="flex justify-center">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Built by Experts
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Our team consists of experienced developers, AI researchers, and UX designers 
          who are passionate about creating tools that empower creativity and productivity. 
          We're constantly working to improve our technology and user experience.
        </p>
      </div>
    </div>
  );
};