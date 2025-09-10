import React from 'react';

interface WritingInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
  maxLength?: number;
}

const WritingInput: React.FC<WritingInputProps> = ({ value, onChange, onSend, disabled = false, maxLength = 500 }) => {
  const remaining = maxLength - value.length;
  const isTooLong = remaining < 0;

  return (
    <div className="bg-gradient-to-br from-calm-blue-50 via-white to-soft-green-50 rounded-2xl p-5 border border-calm-blue-100">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        placeholder="Write whatever's on your mind..."
        className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-calm-blue-400 bg-white/70"
        maxLength={maxLength * 2}
        disabled={disabled}
      />
      <div className="mt-3 flex items-center justify-between">
        <span className={`text-sm ${isTooLong ? 'text-red-600' : 'text-gray-500'}`}>
          {remaining >= 0 ? `${remaining} characters left` : `Over by ${-remaining}`}
        </span>
        <button
          onClick={onSend}
          disabled={disabled || value.trim().length === 0 || isTooLong}
          className="px-5 py-2 rounded-lg bg-calm-blue-600 text-white font-medium hover:bg-calm-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Fly My Plane ✈️
        </button>
      </div>
    </div>
  );
};

export default WritingInput;

