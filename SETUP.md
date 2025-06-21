# Setup Guide - The Technological Republic Explorer

This guide will help you set up the interactive book explorer application.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

## 1. Project Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd karp-republic-explorer

# Install dependencies
npm install
```

## 2. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your Gemini API key
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

## 3. Context Files Setup

Add your book notes and materials to the `src/context/` directory:

```bash
# Create context directory if it doesn't exist
mkdir -p src/context

# Add your markdown files
touch src/context/key-themes.md
touch src/context/soft-belief.md
touch src/context/technological-power.md
```

### Example Context File Structure

```markdown
# Key Themes from The Technological Republic

## Soft Belief
Soft belief refers to the framework for understanding modern ideological structures...

## Data Sovereignty
The control over data flows and digital infrastructure as a form of national power...

## Technological Power
How technology reshapes power structures and creates new forms of influence...
```

## 4. Audio Summary Setup

### Add Audio File

1. Place your `book-summary.wav` file in the `public/audio/` directory
2. Update the transcript in `src/components/AudioSummary.tsx` to match your audio content

### Recommended Audio Generation Tools

- **NotebookLM**: Google's AI notebook for creating summaries
- **ElevenLabs**: High-quality text-to-speech
- **OpenAI TTS**: OpenAI's text-to-speech API
- **Google Cloud TTS**: Google's text-to-speech service

### Audio File Requirements

- Format: WAV
- Quality: 44.1kHz, 16-bit or higher
- Duration: ~15 minutes (as indicated in the UI)
- Channels: Mono or Stereo

## 5. Network Visualization Data

The network visualizations use static data defined in `src/lib/networkDiagramData.ts`. You can customize this by:

1. Adding new nodes (concepts, actors, technologies, events)
2. Creating relationships between nodes
3. Updating colors and sizes for different node types

### Node Types

- **Concept**: Core ideas and frameworks (blue)
- **Actor**: People, organizations, nations (green)  
- **Technology**: Tools and systems (yellow)
- **Event**: Historical or current events (red)

## 6. Run the Application

```bash
# Start development server
npm run dev
```

Visit `http://localhost:8081` to explore the application!

## 7. Build for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## Troubleshooting

### Common Issues

1. **Gemini API Key Error**
   - Ensure your API key is correct
   - Check that the key has proper permissions
   - Verify the environment variable name starts with `VITE_`

2. **Audio Not Playing**
   - Check that `book-summary.wav` exists in `public/audio/`
   - Verify the file format is WAV
   - Check browser console for errors

3. **Network Visualization Issues**
   - Ensure all dependencies are installed: `npm install`
   - Check that `networkDiagramData.ts` has valid data structure
   - Verify browser supports WebGL for 3D visualization

### Development Tips

- Use the browser's developer tools to debug issues
- Check the console for error messages
- Test the AI chat with simple questions first
- Verify context files are being loaded correctly

## Next Steps

- Add more context files for richer AI discussions
- Customize the network visualization data
- Generate and add your audio summary
- Deploy to Netlify or your preferred platform

---

*Happy exploring!* 