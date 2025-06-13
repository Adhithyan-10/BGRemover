# Background Remover - AI-Powered Image Processing

A professional background removal web application built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 **AI-Powered Background Removal** - Remove backgrounds with precision
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🌓 **Dark/Light Theme** - Toggle between themes
- 🔄 **Before/After Comparison** - Interactive slider to compare results
- 📥 **Drag & Drop Upload** - Easy file uploading
- 📊 **Progress Tracking** - Real-time processing updates
- ⚡ **Fast Processing** - Quick background removal

## API Integration

This application uses the Remove.bg API for background removal. Follow these steps to set up the API:

### Step 1: Get Your API Key

1. Visit [Remove.bg](https://www.remove.bg/api)
2. Sign up for an account
3. Go to your API dashboard
4. Copy your API key

### Step 2: Configure the API Key

#### Method 1: Environment File (Recommended)
1. Open the `.env` file in the project root
2. Replace `dummy_api_key_replace_with_real_one` with your actual API key:
   ```
   VITE_REMOVE_BG_API_KEY=your_actual_api_key_here
   ```

#### Method 2: Direct Configuration
1. Open `src/services/api.ts`
2. Find the constructor in `BackgroundRemovalService` class
3. Replace the dummy key in the fallback:
   ```typescript
   apiKey: import.meta.env.VITE_REMOVE_BG_API_KEY || 'your_actual_api_key_here'
   ```

### Step 3: Restart the Development Server

After updating the API key, restart your development server:
```bash
npm run dev
```

## API Status Indicator

The application includes an API status indicator that shows:
- **API Connected** (Green) - When a real API key is configured
- **Demo Mode - Replace API Key** (Amber) - When using the dummy key

## Environment Variables

Create a `.env` file with the following variables:

```env
# Background Removal API Configuration
VITE_REMOVE_BG_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.remove.bg/v1.0
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## API Limits

Remove.bg API has the following limits:
- **Free Plan**: 50 API calls per month
- **Paid Plans**: Higher limits available

Monitor your usage in the Remove.bg dashboard.

## Troubleshooting

### Common Issues

1. **"API Error: 403"** - Invalid API key
   - Check that your API key is correct
   - Ensure you have API calls remaining

2. **"API Error: 402"** - Insufficient credits
   - Check your Remove.bg account balance
   - Upgrade your plan if needed

3. **"Demo Mode" showing** - API key not configured
   - Follow the API key setup steps above
   - Restart the development server

### Support

For API-related issues, contact Remove.bg support.
For application issues, check the browser console for error messages.

## License

MIT License - feel free to use this project for personal or commercial purposes.