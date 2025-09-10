import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AVAILABLE_TAGS, NAME_OPTIONS } from '../../types/community';

interface PostFormProps {
  onSubmit: (postData: {
    title: string;
    content: string;
    author: string;
    tags: string[];
  }) => void;
  onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [nameOption, setNameOption] = useState('Anonymous');
  const [customName, setCustomName] = useState('');
  const [realName, setRealName] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;

    let author = 'Anonymous';
    if (nameOption === 'custom' && customName.trim()) {
      author = customName.trim();
    } else if (nameOption === 'real' && realName.trim()) {
      author = realName.trim();
    }

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      author,
      tags: selectedTags
    });

    // Reset form
    setTitle('');
    setContent('');
    setNameOption('Anonymous');
    setCustomName('');
    setRealName('');
    setSelectedTags([]);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Share Your Experience</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-blue-500 focus:border-transparent"
            maxLength={200}
            required
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Your thoughts *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your experience, tips, or reflections..."
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-blue-500 focus:border-transparent resize-none"
            required
          />
        </div>

        {/* Name Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How would you like to appear?
          </label>
          <div className="space-y-2">
            {NAME_OPTIONS.map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  value={option.value}
                  checked={nameOption === option.value}
                  onChange={(e) => setNameOption(e.target.value)}
                  className="mr-2 text-calm-blue-600 focus:ring-calm-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>

          <AnimatePresence>
            {nameOption === 'custom' && (
              <motion.input
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Enter your nickname"
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-blue-500"
                maxLength={50}
              />
            )}
            {nameOption === 'real' && (
              <motion.input
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                placeholder="Enter your real name"
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-blue-500"
                maxLength={50}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add tags (optional)
          </label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {AVAILABLE_TAGS.map((tag) => (
              <motion.button
                key={tag}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTag(tag)}
                className={`
                  px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${selectedTags.includes(tag)
                    ? 'bg-calm-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-calm-blue-100'
                  }
                `}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-calm-blue-600 text-white py-2 px-4 rounded-lg hover:bg-calm-blue-700 transition-colors font-medium"
          >
            Share Post
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PostForm;
