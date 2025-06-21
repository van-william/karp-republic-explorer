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

## Deployment

The application is configured for Netlify deployment:

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

## Development

### Key Components

- **AudioSummary**: Custom audio player with transcript display
- **NetworkVisualization**: Interactive 3D force-directed graph
- **NetworkVisualization2D**: Interactive 2D force-directed graph
- **ChatInterface**: AI-powered discussion with context awareness

### Adding Content

1. **Audio Summary**: Use NotebookLM or similar tools to generate audio, then update the transcript
2. **Network Data**: Modify `networkDiagramData.ts` to add new concepts and relationships
3. **Context Files**: Add markdown files to enhance AI responses

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Project info

**URL**: https://lovable.dev/projects/a5f31cb8-d706-47e6-8568-06879ca9e99c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a5f31cb8-d706-47e6-8568-06879ca9e99c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a5f31cb8-d706-47e6-8568-06879ca9e99c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
