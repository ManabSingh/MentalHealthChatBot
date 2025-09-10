import React from 'react';
import { motion } from 'framer-motion';
import { AVAILABLE_TAGS } from '../../types/community';

interface TagFilterProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ 
  selectedTags, 
  onTagToggle, 
  onClearAll 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter by Tags</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_TAGS.map((tag) => (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTagToggle(tag)}
            className={`
              px-3 py-1 rounded-full text-sm font-medium transition-all duration-200
              ${selectedTags.includes(tag)
                ? 'bg-calm-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-calm-blue-100 hover:text-calm-blue-700'
              }
            `}
          >
            {tag}
          </motion.button>
        ))}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Active filters: {selectedTags.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default TagFilter;
