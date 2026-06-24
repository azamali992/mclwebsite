import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCommentDots, FaTimes, FaPaperPlane, FaArrowRight } from 'react-icons/fa';
import { sendChatMessage } from '../services/api';
import useChatbot from '../hooks/useChatbot';

const GREETING = "Hi! I'm MCL's website assistant. Ask me about our products, certifications, infrastructure, careers, team or anything else about MCL.";

export default function Chatbot() {
  const navigate = useNavigate();
  const { open, setOpen } = useChatbot();
  const [messages, setMessages] = useState([{ role: 'assistant', content: GREETING }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const goTo = (path) => navigate(path);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const history = nextMessages.slice(-7, -1);
      const data = await sendChatMessage(text, history);
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply, links: data.links }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble responding right now. Please try again or use the Contact page.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close website assistant' : 'Open website assistant'}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[var(--shadow-accent)] transition-[background-color,transform] duration-200 ease-out hover:bg-accent-strong hover:scale-105 active:scale-95"
      >
        {open ? <FaTimes size={20} /> : <FaCommentDots size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[70vh] max-h-[520px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl border border-line bg-canvas shadow-[var(--shadow-lg)]">
          <div className="flex-shrink-0 bg-ink-deep px-5 py-4">
            <p className="text-sm font-semibold text-white">MCL Website Assistant</p>
            <p className="mt-0.5 text-xs text-on-dark-soft">Answers sourced from the MCL website</p>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-surface px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] whitespace-pre-line rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === 'user' ? 'bg-accent text-white' : 'border border-line bg-canvas text-ink-soft shadow-[var(--shadow-sm)]'
                }`}>
                  {m.content}
                </div>
                {m.links?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[85%]">
                    {m.links.map((link) => (
                      <button
                        key={link.path}
                        onClick={() => goTo(link.path)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent transition-colors duration-150 hover:bg-surface-2"
                      >
                        {link.label} <FaArrowRight size={9} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1.5 rounded-xl border border-line bg-canvas px-4 py-3 shadow-[var(--shadow-sm)]">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex flex-shrink-0 items-center gap-2 border-t border-line bg-canvas p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about MCL..."
              maxLength={500}
              className="flex-1 rounded-full border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors duration-150 hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaPaperPlane size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
