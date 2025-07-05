[![Netlify Status](https://api.netlify.com/api/v1/badges/62666553-8db6-4952-bb62-20ac5fce261a/deploy-status)](https://app.netlify.com/projects/tech-republic/deploys)

# The Technological Republic - Interactive Explorer

An interactive web application for exploring "The Technological Republic" by Alex Karp, featuring AI-powered discussion, network visualizations, and multimedia content.

## Features

- **Book Overview**: Comprehensive summary and chapter breakdown
- **Audio Summary**: AI-generated podcast with full transcript
- **AI Discussion**: Gemini-powered chat interface with contextual knowledge
- **Topic Map**: Interactive 2D and 3D network visualizations of book concepts
- **Further Reading**: Curated references and additional resources

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: Shadcn/ui + Tailwind CSS
- **AI Integration**: Google Gemini API
- **Network Visualization**: React Force Graph (2D & 3D)
- **Deployment**: Netlify

## Project Structure

```
karp-republic-explorer/
├── src/
│   ├── components/
│   │   ├── ui/                    # Shadcn/ui components
│   │   ├── AudioSummary.tsx       # Audio player with transcript
│   │   ├── BookSummary.tsx        # Book overview component
│   │   ├── ChatInterface.tsx      # AI discussion interface
│   │   ├── NetworkVisualization.tsx # 3D network diagram
│   │   ├── NetworkVisualization2D.tsx # 2D network diagram
│   │   └── References.tsx         # Further reading section
│   ├── lib/
│   │   ├── geminiApi.ts           # Gemini API integration
│   │   ├── contextLoader.ts       # Context loading from markdown
│   │   └── networkDiagramData.ts  # Network visualization data
│   ├── pages/
│   │   └── Index.tsx              # Main application page
│   └── context/                   # Markdown context files
├── public/
│   └── audio/                     # Audio files (book-summary.wav)
└── .env                           # Environment variables
```

## Setup and Configuration

### 1. Project Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd karp-republic-explorer

# Install dependencies
npm install
```

### 2. Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your Gemini API key
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Getting a Gemini API Key:**

1.  Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2.  Sign in with your Google account
3.  Click "Create API Key"
4.  Copy the key and add it to your `.env` file

## Content Management

### AI Context Files

This application uses markdown files in the `context/` directory to provide contextual information to the AI chat.

- **How it Works**: The AI will automatically search and include relevant information from these files based on user questions.
- **How to Add**: Create `.md` files in the `context/` directory. Use descriptive filenames (e.g., `soft-belief.md`) and clear headings within the files for best results.

### Audio Summary

1.  **Add Audio File**: Place your `book-summary.wav` file in the `public/audio/` directory.
2.  **Update Transcript**: Edit the transcript in `src/components/AudioSummary.tsx` to match your audio.
3.  **Recommended Tools**: You can use tools like NotebookLM, ElevenLabs, or OpenAI TTS to generate audio from your summaries.

### Network Visualization Data

The network visualizations are powered by static data in `src/lib/networkDiagramData.ts`. You can customize the graphs by editing this file to add or modify nodes and relationships.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview the build
npm run preview
```

## Deployment on Netlify

The application is optimized for Netlify deployment:

1.  **Connect Repository**: In your Netlify dashboard, select "New site from Git" and connect your repository.
2.  **Build Settings**:
    -   Build command: `npm run build`
    -   Publish directory: `dist`
3.  **Environment Variables**: Add `VITE_GEMINI_API_KEY` in your site settings.
4.  **Deploy**: Push to your main branch to trigger automatic deployment.

## Troubleshooting

-   **Gemini API Key Error**: Ensure your API key is correct, has the proper permissions, and that the environment variable in your `.env` file is prefixed with `VITE_`.
-   **Audio Not Playing**: Check that your `.wav` file is in the `public/audio/` directory and that there are no errors in the browser console.
-   **Network Visualization Issues**: Make sure all dependencies are installed (`npm install`) and that your browser supports WebGL for the 3D visualization.

## Contributing

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/amazing-feature`)
3.  Make your changes
4.  Commit your changes (`git commit -m 'Add amazing feature'`)
5.  Push to the branch (`git push origin feature/amazing-feature`)
6.  Open a Pull Request

## License

MIT License - see LICENSE file for details
