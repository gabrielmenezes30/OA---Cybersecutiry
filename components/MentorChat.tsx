import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { ChatMessage } from '../types';

interface MentorChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MentorChat: React.FC<MentorChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Saudações. Eu sou o CyberMentor. Pergunte-me qualquer coisa sobre a missão ou como explicar esses conceitos aos alunos.",
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Get response
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await getChatResponse(history, userMsg.text);

    setMessages(prev => [...prev, {
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 bottom-0 w-80 sm:w-96 bg-cyber-900 border-l border-cyber-700 shadow-2xl flex flex-col z-50 animate-slideInRight">
      {/* Header */}
      <div className="p-4 border-b border-cyber-700 flex justify-between items-center bg-cyber-800">
        <div className="flex items-center gap-2">
          <Bot className="text-cyber-500" size={20} />
          <h2 className="text-white font-semibold">CyberMentor</h2>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'model' ? 'bg-cyber-800 text-cyber-500' : 'bg-blue-900 text-blue-200'
            }`}>
              {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`p-3 rounded-lg text-sm max-w-[80%] ${
              msg.role === 'model' 
                ? 'bg-cyber-800 text-gray-200 border border-cyber-700' 
                : 'bg-blue-600 text-white'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-cyber-800 text-cyber-500 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-cyber-800 p-3 rounded-lg border border-cyber-700 flex items-center gap-1">
              <div className="w-2 h-2 bg-cyber-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyber-500 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-cyber-500 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-cyber-700 bg-cyber-800">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Peça esclarecimentos..."
            className="w-full bg-cyber-900 border border-cyber-600 text-white text-sm rounded-full pl-4 pr-10 py-3 focus:outline-none focus:border-cyber-400"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-cyber-500 text-cyber-900 rounded-full hover:bg-cyber-400 disabled:opacity-50 disabled:bg-gray-600"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};