const { Pool } = require('@neondatabase/serverless');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { embedding, limit = 5 } = JSON.parse(event.body);

    if (!embedding || !Array.isArray(embedding)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid embedding provided' })
      };
    }

    // text-embedding-004 returns 768 dimensions, no truncation needed
    const truncatedEmbedding = embedding;

    // Connect to Neon database using the serverless driver
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    // Query for similar chunks using cosine similarity
    const query = `
      SELECT 
        id,
        content,
        metadata,
        source_file,
        chunk_index,
        1 - (embedding <=> $1) as similarity
      FROM document_chunks 
      WHERE embedding IS NOT NULL
      ORDER BY embedding <=> $1
      LIMIT $2
    `;

    const result = await pool.query(query, [truncatedEmbedding, limit]);
    await pool.end();

    // Transform results to match expected format
    const chunks = result.rows.map(row => ({
      id: row.id,
      content: row.content,
      metadata: row.metadata,
      source_file: row.source_file,
      chunk_index: row.chunk_index,
      relevanceScore: row.similarity
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(chunks)
    };

  } catch (error) {
    console.error('Error in search-context function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      })
    };
  }
}; 