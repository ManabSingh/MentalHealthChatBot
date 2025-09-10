import React, { useState } from 'react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to our anonymous chat support. I'm here to listen and help. How are you feeling today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isOnline] = useState(true);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: newMessage,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages([...messages, userMessage]);
      setNewMessage('');
      
      // Simulate a response (in a real app, this would be handled by your chat system)
      setTimeout(() => {
        const supportResponse: Message = {
          id: messages.length + 2,
          text: "Thank you for sharing that with me. I understand it can be difficult to talk about these things. Can you tell me more about what's been on your mind?",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, supportResponse]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-blue-50 to-soft-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Anonymous Chat Support
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Connect with trained peer supporters in a safe, confidential environment. 
            Your privacy is our priority - no personal information required.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
              {isOnline ? 'Support Available' : 'Currently Offline'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Chat Header */}
              <div className="bg-calm-blue-600 text-white p-6">
                <h2 className="text-xl font-semibold">Live Support Chat</h2>
                <p className="text-calm-blue-100 text-sm mt-1">
                  You're chatting anonymously with a trained peer supporter
                </p>
              </div>

              {/* Messages Area */}
              <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.isUser
                          ? 'bg-calm-blue-600 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-2 ${
                        message.isUser ? 'text-calm-blue-200' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-6 bg-white border-t">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-calm-blue-500 focus:border-transparent"
                    disabled={!isOnline}
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim() || !isOnline}
                    className="bg-calm-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-calm-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Send
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Press Enter to send • Your conversation is private and anonymous
                </p>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Tips */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Chat Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Take your time to express yourself
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  You can share as much or as little as you're comfortable with
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Our supporters are trained to listen without judgment
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Feel free to end the conversation at any time
                </li>
              </ul>
            </div>

            {/* Emergency Resources */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-4">🚨 Crisis Support</h3>
              <p className="text-sm text-red-700 mb-4">
                If you're having thoughts of self-harm or suicide, please reach out immediately:
              </p>
              <div className="space-y-2">
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  Crisis Hotline: 1-800-233-3330
                </button>
                <button className="w-full bg-red-100 text-red-800 py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                  Text "HOME" to 741741
                </button>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-soft-green-50 border border-soft-green-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-soft-green-800 mb-3">🔒 Your Privacy</h3>
              <ul className="space-y-2 text-sm text-soft-green-700">
                <li>• No personal information required</li>
                <li>• Conversations are not recorded</li>
                <li>• Anonymous and confidential</li>
                <li>• Secure, encrypted connection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;
