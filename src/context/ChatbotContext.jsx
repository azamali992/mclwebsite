import { useState } from 'react';
import { ChatbotContext } from './chatbotContextValue';

export function ChatbotProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <ChatbotContext.Provider value={{ open, setOpen }}>
      {children}
    </ChatbotContext.Provider>
  );
}
