import { retrieve } from '../utils/rag.js';
import Career from '../models/Career.js';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
const MIN_RELEVANCE = 0.2;
const CAREER_KEYWORDS = /\b(job|jobs|career|careers|opening|openings|vacanc|hiring|position|positions|apply|employment|recruit)\w*/i;

const SYSTEM_PROMPT = `You are the website assistant for Multan Chemicals Limited (MCL), a Pakistani industrial and medical gas manufacturer. Answer the user's question using ONLY the information in the Context section below, which covers MCL's products, certifications, infrastructure, quality & safety, careers, team and company information.

Rules:
- If the user is just greeting you or making small talk with no real question, reply with a brief friendly greeting and invite them to ask about MCL — do not say you lack information for a greeting.
- If the answer is not contained in the Context, say "I don't have that information — please contact our sales team via the Contact page." Do not guess or invent details.
- Never state or imply a price; nothing in the Context includes pricing.
- If a "[Current Live Job Openings]" block appears in the Context, treat it as the current, authoritative list of open positions and answer job/career questions directly from it.
- Keep answers short (2-4 sentences, or a short bullet list for multiple features).
- Answer naturally as MCL's assistant — don't mention "the context" or "the document".`;

async function getLiveCareersContext() {
  try {
    const jobs = await Career.find({ isActive: true }).select('position department location type').limit(10).lean();
    if (jobs.length === 0) return 'There are no open job postings listed right now — check the Careers page or contact us.';
    return jobs.map((j) => `${j.position} — ${j.department || 'General'} (${j.location || 'Pakistan'}, ${j.type || 'Full-time'})`).join('\n');
  } catch {
    return null;
  }
}

export async function handleChat(req, res) {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ message: 'A message is required' });
  }
  if (message.length > 1000) {
    return res.status(400).json({ message: 'Message is too long' });
  }
  if (!process.env.GROQ_API_KEY) {
    return res.status(503).json({ message: 'Chat assistant is not configured yet' });
  }

  try {
    const matches = await retrieve(message, 10);
    const relevant = matches.filter((m) => m.score >= MIN_RELEVANCE);
    let context = relevant.map((m) => `[${m.source}]\n${m.text}`).join('\n\n') || 'No relevant context found.';

    if (CAREER_KEYWORDS.test(message)) {
      const liveCareers = await getLiveCareersContext();
      if (liveCareers) context += `\n\n[Current Live Job Openings]\n${liveCareers}`;
    }

    const trimmedHistory = Array.isArray(history)
      ? history.slice(-6).map((h) => ({
          role: h.role === 'user' ? 'user' : 'assistant',
          content: String(h.content || '').slice(0, 1000),
        }))
      : [];

    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.3,
        max_tokens: 400,
        messages: [
          { role: 'system', content: `${SYSTEM_PROMPT}\n\nContext:\n${context}` },
          ...trimmedHistory,
          { role: 'user', content: message },
        ],
      }),
    });

    if (!groqRes.ok) {
      console.error('Groq API error:', groqRes.status, await groqRes.text());
      return res.status(502).json({ message: 'Chat assistant is temporarily unavailable' });
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim()
      || "I don't have that information — please contact our sales team via the Contact page.";

    const links = [];
    const seenPaths = new Set();
    for (const m of relevant) {
      if (!m.link || seenPaths.has(m.link.path)) continue;
      seenPaths.add(m.link.path);
      links.push({ label: m.source.split(' — ').pop(), path: m.link.path });
      if (links.length >= 3) break;
    }

    res.json({ reply, sources: [...new Set(relevant.map((m) => m.source))], links });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process chat message', error: error.message });
  }
}
