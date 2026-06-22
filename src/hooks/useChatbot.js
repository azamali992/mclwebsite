import { useContext } from 'react';
import { ChatbotContext } from '../context/chatbotContextValue';

export default function useChatbot() {
  const ctx = useContext(ChatbotContext);
  if (!ctx) throw new Error('useChatbot must be used within a ChatbotProvider');
  return ctx;
}
