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

## Quick Start

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd karp-republic-explorer
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your Gemini API key: VITE_GEMINI_API_KEY=your_key_here
   ```

3. **Add audio content**
   - Place your `book-summary.wav` file in `public/audio/`
   - Update the transcript in `AudioSummary.tsx` to match your audio

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Configuration

### Environment Variables
- `VITE_GEMINI_API_KEY`: Google Gemini API key for AI discussions

### Customization
- **Network Data**: Edit `src/lib/networkDiagramData.ts` to modify the concept network
- **Context Files**: Add markdown files to `src/context/` for AI context
- **Audio Content**: Replace `public/audio/book-summary.wav` with your audio file

## Deployment on Netlify

The application is optimized for Netlify deployment:

1. **Connect Repository**
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Connect your repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18 or higher

3. **Environment Variables**
   - Add `VITE_GEMINI_API_KEY` in Netlify dashboard under Site settings > Environment variables

4. **Deploy**
   - Push to your main branch to trigger automatic deployment
   - Monitor deployment logs for any issues

## Development

### Key Components

- **AudioSummary**: Custom audio player with transcript display
- **NetworkVisualization**: Interactive 3D force-directed graph with improved stability
- **NetworkVisualization2D**: Interactive 2D force-directed graph with improved stability
- **ChatInterface**: AI-powered discussion with context awareness

### Adding Content

1. **Audio Summary**: Use NotebookLM or similar tools to generate audio, then update the transcript
2. **Network Data**: Modify `networkDiagramData.ts` to add new concepts and relationships
3. **Context Files**: Add markdown files to enhance AI responses

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technologies Used

- **Vite**: Fast build tool and development server
- **TypeScript**: Type-safe JavaScript
- **React**: UI framework
- **Shadcn/ui**: Modern UI component library
- **Tailwind CSS**: Utility-first CSS framework
- **React Force Graph**: Interactive network visualizations
- **Google Gemini API**: AI-powered chat functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

MIT License - see LICENSE file for details
