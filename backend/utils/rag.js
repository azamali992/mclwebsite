import { knowledgeBase } from '../data/knowledgeBase.js';
import { embed, cosineSimilarity } from './embeddings.js';

let indexPromise = null;

async function buildIndex() {
  console.log(`Building RAG embedding index for ${knowledgeBase.length} chunks...`);
  const vectors = await Promise.all(knowledgeBase.map((c) => embed(c.text)));
  console.log('RAG embedding index ready.');
  return knowledgeBase.map((c, i) => ({ ...c, vector: vectors[i] }));
}

function getIndex() {
  if (!indexPromise) {
    indexPromise = buildIndex();
  }
  return indexPromise;
}

// Pre-builds the embedding index so the first real chat request isn't slow.
export function warmUpIndex() {
  getIndex().catch((err) => console.error('Failed to warm up RAG index:', err));
}

export async function retrieve(query, topK = 5) {
  const index = await getIndex();
  const queryVector = await embed(query);

  return index
    .map((c) => ({ id: c.id, source: c.source, text: c.text, link: c.link, score: cosineSimilarity(queryVector, c.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
