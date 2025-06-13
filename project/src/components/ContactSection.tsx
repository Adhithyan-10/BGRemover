import React, { useState } from 'react';
import { Mail, MessageSquare, Send, MapPin, Phone, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('idle');
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@bgremover.com',
      description: 'Get in touch for support or questions'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      content: 'Available 24/7',
      description: 'Instant help when you need it'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      content: '+1 (555) 123-4567',
      description: 'Business hours: 9 AM - 6 PM EST'
    }
  ];

  const faqs = [
    {
      question: 'How accurate is the background removal?',
      answer: 'Our AI-powered tool achieves 99.9% accuracy for most images, with exceptional performance on portraits, products, and objects with clear edges.'
    },
    {
      question: 'What file formats are supported?',
      answer: 'We support all major image formats including PNG, JPG, JPEG, WebP, and more. Maximum file size is 10MB.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We process images securely and never store them on our servers. Your privacy is our top priority.'
    },
    {
      question: 'Can I use this for commercial purposes?',
      answer: 'Yes, you can use our tool for both personal and commercial projects. Check our terms of service for detailed usage rights.'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white">
          Get in Touch
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have questions about our background removal tool? We're here to help! 
          Reach out to our support team or check our frequently asked questions.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <div
              key={index}
              className="text-center p-6 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/10 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Icon className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {info.title}
              </h3>
              <p className="text-blue-500 font-medium mb-2">
                {info.content}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {info.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Contact Form and FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Send us a Message
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                submitStatus === 'success'
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:scale-105'
              } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <Send className="w-5 h-5" />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Quick answers to common questions about our service.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-4 bg-white/10 dark:bg-black/10 backdrop-blur-md rounded-xl border border-white/20 dark:border-white/10"
              >
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Business Hours */}
          <div className="p-6 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-200/20 dark:border-blue-800/20">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Support Hours
              </h3>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
              <p>Saturday: 10:00 AM - 4:00 PM EST</p>
              <p>Sunday: Closed</p>
              <p className="text-blue-500 font-medium mt-2">
                Emergency support available 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};