import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpertChat = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  const experts = [
    { id: 1, name: 'Dr. Arpan Patel', expertise: 'Crop Protection & Pathology', rating: 4.9, cases: 1250, status: 'online', avatar: '👨‍🔬', badge: 'Golden Expert' },
    { id: 2, name: 'Dr. Sarah Khan', expertise: 'Soil Health & Nutrients', rating: 4.8, cases: 980, status: 'away', avatar: '👩‍🔬', badge: 'Certified' },
    { id: 3, name: 'Er. Rajesh Kumar', expertise: 'Irrigation & Agri-Tech', rating: 4.7, cases: 750, status: 'online', avatar: '👨‍💻', badge: 'Innovator' }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = { id: Date.now(), text: newMessage, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages([...messages, userMsg]);
    setNewMessage('');

    // Simulate expert reply
    setIsTyping(true);
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        text: `Hello! I've analyzed your query. Regarding your ${selectedExpert?.expertise || 'concern'}, I recommend checking the leaf undersides for any signs of discoloration. Could you share a photo?`,
        sender: 'expert',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-100px)] max-w-7xl mx-auto my-4 bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 shadow-2xl overflow-hidden relative">
      {/* 3D Glassmorphism Expert List */}
      <div className={`w-full md:w-80 border-r border-white/30 flex-col bg-white/20 ${selectedExpert ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-4">Experts</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search expertise..."
              className="w-full bg-white/50 backdrop-blur-md border border-white/50 rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-500 shadow-inner"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {experts.map(expert => (
            <motion.div
              key={expert.id}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedExpert(expert)}
              className={`p-4 rounded-[1.5rem] cursor-pointer transition-all border-2 ${selectedExpert?.id === expert.id
                  ? 'bg-green-600 text-white border-green-400 shadow-lg shadow-green-200'
                  : 'bg-white/50 border-transparent hover:bg-white hover:border-green-100'
                }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-sm relative">
                  {expert.avatar}
                  <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${expert.status === 'online' ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                </div>
                <div>
                  <div className="font-black text-sm">{expert.name}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${selectedExpert?.id === expert.id ? 'text-green-100' : 'text-gray-400'}`}>
                    {expert.expertise}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Interface with Animations */}
      <div className={`flex-1 flex flex-col relative ${!selectedExpert ? 'hidden md:flex' : 'flex'}`}>
        <AnimatePresence mode="wait">
          {selectedExpert ? (
            <motion.div
              key={selectedExpert.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col h-full"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/30 bg-white/10 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <button onClick={() => setSelectedExpert(null)} className="md:hidden p-2 hover:bg-white/20 rounded-full transition-colors">
                    ←
                  </button>
                  <div className="text-3xl">{selectedExpert.avatar}</div>
                  <div>
                    <h3 className="font-black text-gray-900">{selectedExpert.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 text-sm">★ {selectedExpert.rating}</span>
                      <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-full">{selectedExpert.badge}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-3 bg-white/80 rounded-2xl shadow-sm text-green-600 hover:bg-green-50 transition-colors">📞</motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-3 bg-green-600 rounded-2xl shadow-lg text-white hover:bg-green-700 transition-colors">📹</motion.button>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-4"
              >
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-6xl mb-4">👋</motion.div>
                    <p className="text-gray-500 font-bold">Start a consultation with {selectedExpert.name}.</p>
                    <p className="text-sm text-gray-400 mt-1 italic">Typically replies in under 2 minutes</p>
                  </div>
                )}
                <AnimatePresence initial={false}>
                  {messages.map(msg => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] p-4 rounded-[1.5rem] shadow-xl ${msg.sender === 'user'
                          ? 'bg-gradient-to-br from-green-600 to-emerald-700 text-white rounded-tr-none'
                          : 'bg-white text-gray-800 rounded-tl-none border border-white'
                        }`}>
                        <div className="font-medium leading-relaxed">{msg.text}</div>
                        <div className={`text-[10px] mt-2 font-black ${msg.sender === 'user' ? 'text-green-100' : 'text-gray-400'}`}>
                          {msg.time}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white/50 backdrop-blur-md px-4 py-2 rounded-2xl flex gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="p-6 bg-white/10 backdrop-blur-md border-t border-white/30">
                <form onSubmit={handleSend} className="flex gap-4">
                  <motion.button type="button" whileHover={{ scale: 1.1 }} className="p-4 bg-white/50 rounded-2xl hover:bg-white text-gray-500 transition-all">📎</motion.button>
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Describe your issue in detail..."
                    className="flex-1 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-500 shadow-inner"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-8 py-4 bg-green-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-green-200 hover:bg-green-700 transition-all flex items-center gap-2"
                  >
                    Send 🚀
                  </motion.button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center p-12 text-center"
            >
              <div className="w-48 h-48 bg-green-50 rounded-full flex items-center justify-center text-7xl mb-8 border-4 border-white shadow-inner animate-pulse">
                ⚕️
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Select an Agricultural Expert</h2>
              <p className="text-gray-500 max-w-sm font-medium leading-relaxed">
                Connect with verified scientists and engineers to solve your farming challenges in real-time.
              </p>
              <div className="mt-8 flex gap-3 flex-wrap justify-center">
                {['#SoilHealth', '#PestControl', '#Irrigation', '#SmartFarming'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/50 backdrop-blur-md rounded-xl text-xs font-black text-green-700 shadow-sm">{tag}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default ExpertChat;
