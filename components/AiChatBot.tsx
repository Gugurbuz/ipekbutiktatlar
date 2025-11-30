import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, X, Minimize2, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';

export const AiChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{id: number, text: string, sender: 'bot' | 'user'}[]>([
    { id: 1, text: "Merhaba! Ben İpek Butik Asistanı. 🍰 Size pasta seçiminde veya sipariş oluşturmada nasıl yardımcı olabilirim?", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      if (responseText) {
          const botMsg = { id: Date.now() + 1, text: responseText, sender: 'bot' as const };
          setMessages(prev => [...prev, botMsg]);
      }
    } catch (error) {
        console.error(error);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl mb-4 overflow-hidden border border-gray-100 pointer-events-auto animate-in slide-in-from-bottom-5 duration-300 flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-rose-500 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm">İpek Asistan</h3>
                <span className="text-xs text-rose-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Çevrimiçi
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
              <Minimize2 size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-rose-500 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 shadow-sm rounded-tl-none border border-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-500 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm text-xs flex gap-1 items-center border border-gray-100">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Bir mesaj yazın..."
              className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
            />
            <button 
              type="submit" 
              className="bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition shadow-md disabled:opacity-50"
              disabled={!input.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="pointer-events-auto bg-gray-900 hover:bg-rose-500 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group relative"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 border-2 border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
};
