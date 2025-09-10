import React, { useState } from 'react';

interface ReplyBoxProps {
  onSubmit: (text: string) => void;
  disabled?: boolean;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ onSubmit, disabled = false }) => {
  const [value, setValue] = useState('');

  const handle = () => {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <div className="bg-lavender-50 border border-lavender-200 rounded-2xl p-4">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        placeholder="Write a gentle reply..."
        className="w-full p-3 rounded-xl border border-lavender-300 focus:outline-none focus:ring-2 focus:ring-lavender-400 bg-white"
        disabled={disabled}
      />
      <div className="text-right mt-3">
        <button
          onClick={handle}
          disabled={disabled || value.trim().length === 0}
          className="px-4 py-2 rounded-lg bg-lavender-500 text-white font-medium hover:bg-lavender-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Send Reply ✉️
        </button>
      </div>
    </div>
  );
};

export default ReplyBox;

