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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-mclRed text-white shadow-xl shadow-red-900/30 flex items-center justify-center hover:bg-red-800 transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        {open ? <FaTimes size={20} /> : <FaCommentDots size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-slate-900 px-5 py-4 flex-shrink-0">
            <p className="text-white font-bold text-sm">MCL Website Assistant</p>
            <p className="text-gray-400 text-xs mt-0.5">Answers sourced from the MCL website</p>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                  m.role === 'user' ? 'bg-mclRed text-white' : 'bg-white text-gray-700 border border-gray-200 shadow-sm'
                }`}>
                  {m.content}
                </div>
                {m.links?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[85%]">
                    {m.links.map((link) => (
                      <button
                        key={link.path}
                        onClick={() => goTo(link.path)}
                        className="text-xs font-semibold text-mclRed bg-red-50 hover:bg-red-100 border border-red-100 rounded-full px-3 py-1.5 inline-flex items-center gap-1.5 transition-colors"
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
                <div className="bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3 flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex-shrink-0 border-t border-gray-100 p-3 flex items-center gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about MCL..."
              maxLength={500}
              className="flex-1 text-sm px-3.5 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mclRed/40 focus:border-mclRed"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="w-10 h-10 rounded-full bg-mclRed text-white flex items-center justify-center flex-shrink-0 hover:bg-red-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FaPaperPlane size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
