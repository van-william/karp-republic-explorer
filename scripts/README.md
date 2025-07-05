# Context Chunking and Neon Upload Scripts

This directory contains Python scripts to chunk your markdown context files and upload them to a Neon database for better RAG (Retrieval-Augmented Generation) capabilities.

## Setup

### 1. Install Python Dependencies

```bash
cd scripts
uv sync
```

Or if you prefer to use a virtual environment:
```bash
cd scripts
uv venv
source .venv/bin/activate  # On macOS/Linux
# or
.venv\Scripts\activate     # On Windows
uv pip install -r requirements.txt
```

### 2. Set Up Environment Variables

Create a `.env` file in the `scripts` directory with your API keys:

```bash
# .env
GEMINI_API_KEY=your_gemini_api_key_here
NEON_DATABASE_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname
```

### 3. Get Your Neon Database URL

1. Go to [neon.tech](https://neon.tech) and create a new project
2. Copy the connection string from your project dashboard
3. Add it to your `.env` file as `NEON_DATABASE_URL`

## Usage

### Chunk and Upload Context Files

```bash
cd scripts
uv run python chunk_and_upload.py
```

Or if you have a virtual environment activated:
```bash
cd scripts
python chunk_and_upload.py
```

This script will:
1. Read all `.md` files from the `../context` directory
2. Split them into semantic chunks (respecting headers and content boundaries)
3. Generate embeddings for each chunk using Google's Gemini model
4. Upload everything to your Neon database

### What the Script Does

- **Chunks by Headers**: Splits content at markdown headers to maintain semantic boundaries
- **Token-based Chunking**: Uses ~1000 tokens per chunk with 200 token overlap
- **Metadata Preservation**: Stores source file, chunk index, and section headers
- **Error Handling**: Skips chunks that fail embedding generation
- **Progress Tracking**: Shows detailed progress as it processes files

## Configuration

You can modify the chunking parameters in `chunk_and_upload.py`:

```python
chunk_size = 1000  # tokens per chunk
overlap = 200      # token overlap between chunks
```

## Database Schema

The script creates a `document_chunks` table with:

- `id`: Primary key
- `content`: The actual text chunk
- `embedding`: Vector embedding (768 dimensions)
- `metadata`: JSON with chunk type, section headers, etc.
- `source_file`: Original markdown filename
- `chunk_index`: Position within the source file
- `created_at`: Timestamp

## Next Steps

After running the script:

1. **Add to Netlify**: Add `NEON_DATABASE_URL` to your Netlify environment variables
2. **Update Frontend**: Modify `src/lib/contextLoader.ts` to query the Neon database
3. **Test**: Try the AI discussion feature with the new vector search

## Troubleshooting

### Common Issues

**"NEON_DATABASE_URL not found"**
- Make sure you have a `.env` file in the `scripts` directory
- Check that the environment variable name is correct

**"Error generating embedding"**
- Verify your `GEMINI_API_KEY` is valid
- Check your internet connection
- The script will skip failed chunks and continue

**"Connection failed"**
- Verify your Neon connection string is correct
- Make sure your Neon database is active
- Check if you need to whitelist your IP address

### Re-running the Script

The script is safe to run multiple times - it uses `CREATE TABLE IF NOT EXISTS` and will append new chunks. If you want to start fresh:

```sql
-- Run this in your Neon SQL editor to clear existing data
TRUNCATE TABLE document_chunks;
```

## Python Version Requirements

The scripts require Python 3.9 or higher. The `pyproject.toml` file specifies `requires-python = ">=3.9"` which is compatible with:
- Python 3.9+
- Python 3.10+
- Python 3.11+
- Python 3.12+

`uv` will automatically select an appropriate Python version if you have multiple versions installed. 