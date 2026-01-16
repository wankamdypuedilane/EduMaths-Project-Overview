import { useState } from 'react';
import { AppLayout } from '../components/AppLayout';
import { User, Send } from 'lucide-react';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

export function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Bonjour ! 👋 Je suis votre tuteur IA en mathématiques. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Ajouter le message utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simuler une réponse de l'IA (à remplacer par vraie API)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Je suis là pour vous aider ! Cette fonctionnalité sera bientôt connectée à une vraie IA. Pour l\'instant, c\'est une démonstration.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <AppLayout activePage="tutor">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Tuteur IA</h1>
              <p className="text-sm text-gray-600">Posez vos questions, je suis là pour vous aider</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}
            >
              {message.type === 'ai' && (
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🤖</span>
                </div>
              )}
              
              <div
                className={`rounded-2xl p-4 shadow-sm max-w-lg ${
                  message.type === 'ai'
                    ? 'bg-white rounded-tl-none'
                    : 'bg-indigo-600 rounded-tr-none'
                }`}
              >
                <p className={message.type === 'ai' ? 'text-gray-800' : 'text-white'}>
                  {message.content}
                </p>
              </div>

              {message.type === 'user' && (
                <div className="bg-gray-300 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Posez votre question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
