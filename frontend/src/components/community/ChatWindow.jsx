import React, { useState, useRef, useEffect } from 'react';

const ChatWindow = ({ conversationId, currentUser, otherUser }) => {
    const [messages, setMessages] = useState([
        { id: 1, senderId: 'other', content: 'Hello! How can I help you with your farming queries?', time: '10:30 AM', type: 'text' },
        { id: 2, senderId: 'me', content: 'I have noticed some yellow spots on my wheat leaves. What could be the problem?', time: '10:32 AM', type: 'text' },
        { id: 3, senderId: 'other', content: 'That sounds like it could be wheat rust. Can you share a photo of the affected leaves?', time: '10:33 AM', type: 'text', isByExpert: true }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const user = currentUser || { id: 'me', name: 'You', avatar: null };
    const expert = otherUser || { id: 'other', name: 'Dr. Sharma', role: 'Agriculture Expert', avatar: null };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message = {
            id: messages.length + 1,
            senderId: 'me',
            content: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text'
        };

        setMessages([...messages, message]);
        setNewMessage('');

        // Simulate expert typing
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                senderId: 'other',
                content: 'Thank you for sharing. Based on your description, I recommend applying a fungicide treatment. Would you like me to suggest specific products?',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'text',
                isByExpert: true
            }]);
        }, 2000);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const message = {
                id: messages.length + 1,
                senderId: 'me',
                content: file.name,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'file',
                fileType: file.type.startsWith('image/') ? 'image' : 'document'
            };
            setMessages([...messages, message]);
        }
    };

    return (
        <div className="flex flex-col h-[600px] max-h-[80vh] bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                    {expert.name[0]}
                </div>
                <div className="flex-1">
                    <h3 className="text-white font-semibold">{expert.name}</h3>
                    <p className="text-green-100 text-sm">{expert.role}</p>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                    <span className="text-green-100 text-sm">Online</span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] sm:max-w-[70%] ${msg.senderId === 'me' ? 'order-2' : 'order-1'}`}>
                            {msg.senderId !== 'me' && (
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">
                                        {expert.name[0]}
                                    </div>
                                    {msg.isByExpert && (
                                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">Expert</span>
                                    )}
                                </div>
                            )}
                            <div className={`rounded-2xl px-4 py-2.5 ${msg.senderId === 'me'
                                    ? 'bg-green-600 text-white rounded-br-md'
                                    : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                                }`}>
                                {msg.type === 'file' ? (
                                    <div className="flex items-center gap-2">
                                        {msg.fileType === 'image' ? (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                                        )}
                                        <span className="text-sm">{msg.content}</span>
                                    </div>
                                ) : (
                                    <p className="text-sm sm:text-base">{msg.content}</p>
                                )}
                            </div>
                            <p className={`text-xs text-gray-500 mt-1 ${msg.senderId === 'me' ? 'text-right' : 'text-left'}`}>
                                {msg.time}
                            </p>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">
                            {expert.name[0]}
                        </div>
                        <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 sm:p-4 bg-white border-t border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3">
                    <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*,.pdf,.doc,.docx" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-full transition-colors">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2.5 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors text-sm sm:text-base"
                    />
                    <button type="submit" disabled={!newMessage.trim()} className="p-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatWindow;
