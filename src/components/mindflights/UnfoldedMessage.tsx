import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlaneMessage } from '../../types/mindFlights';

interface UnfoldedMessageProps {
  message: PlaneMessage;
  onClose: () => void;
  onReply: (reply: string) => void;
}

const UnfoldedMessage: React.FC<UnfoldedMessageProps> = ({ 
  message, 
  onClose, 
  onReply 
}) => {
  const [reply, setReply] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmit = () => {
    if (reply.trim()) {
      onReply(reply.trim());
      setReply('');
      setShowReplyForm(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.1, rotate: 45, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        className="relative max-w-lg w-full"
      >
        {/* Paper unfolding effect */}
        <motion.div
          initial={{ rotateX: 90, rotateY: 45 }}
          animate={{ rotateX: 0, rotateY: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Paper shadow */}
          <div className="absolute inset-0 bg-gray-400 rounded-lg transform translate-x-2 translate-y-2 opacity-30" />
          
          {/* Main paper */}
          <div className="relative bg-white paper-texture rounded-lg border border-gray-300 p-6 shadow-xl">
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl leading-none"
            >
              ×
            </button>

            {/* Paper holes */}
            <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-start pt-6 space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-200 border border-gray-300" />
              ))}
            </div>
            
            {/* Red margin line */}
            <div className="absolute left-10 top-0 bottom-0 w-px bg-red-200" />
            
            {/* Message content */}
            <div className="pl-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📨</span>
                <h3 className="text-lg font-semibold text-gray-900">Anonymous Message</h3>
              </div>
              
              <div 
                className="text-gray-800 leading-6 mb-4"
                style={{ fontFamily: "'Kalam', cursive", lineHeight: '24px' }}
              >
                {message.content}
              </div>
              
              <div className="text-xs text-gray-500 mb-4">
                Sent {new Date(message.createdAt).toLocaleDateString()}
              </div>

              {/* Existing replies */}
              {message.replies.length > 0 && (
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Anonymous Replies:</h4>
                  <div className="space-y-3">
                    {message.replies.map((r) => (
                      <div 
                        key={r.id} 
                        className="bg-calm-blue-50 border border-calm-blue-200 rounded-lg p-3"
                        style={{ fontFamily: "'Kalam', cursive" }}
                      >
                        <p className="text-gray-700 text-sm leading-relaxed">{r.content}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reply section */}
              {!showReplyForm ? (
                <button
                  onClick={() => setShowReplyForm(true)}
                  className="w-full py-2 px-4 bg-lavender-500 text-white rounded-lg hover:bg-lavender-600 transition-colors"
                >
                  Add a supportive reply 💌
                </button>
              ) : (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 pt-4"
                  >
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Write a kind, supportive response..."
                      rows={3}
                      className="w-full p-3 bg-transparent border border-lavender-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-lavender-400"
                      style={{ fontFamily: "'Kalam', cursive" }}
                    />
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={handleReplySubmit}
                        disabled={!reply.trim()}
                        className="px-4 py-2 bg-lavender-500 text-white rounded-lg hover:bg-lavender-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Send Reply
                      </button>
                      <button
                        onClick={() => setShowReplyForm(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UnfoldedMessage;
