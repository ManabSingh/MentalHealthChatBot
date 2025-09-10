import React from 'react';

interface MessageViewProps {
  content: string;
  createdAt: string;
  replies: { id: string; content: string; createdAt: string }[];
}

const MessageView: React.FC<MessageViewProps> = ({ content, createdAt, replies }) => {
  const date = new Date(createdAt);
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
      <div className="flex items-start gap-3">
        <div className="text-3xl">📨</div>
        <div className="flex-1">
          <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
          <p className="text-xs text-gray-500 mt-2">Sent {date.toLocaleString()}</p>
        </div>
      </div>

      {replies.length > 0 && (
        <div className="mt-5">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Replies</h4>
          <div className="space-y-3">
            {replies.map((r) => (
              <div key={r.id} className="bg-calm-blue-50 border border-calm-blue-200 rounded-xl p-3">
                <p className="text-gray-800 whitespace-pre-wrap text-sm">{r.content}</p>
                <p className="text-[10px] text-gray-500 mt-1">{new Date(r.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageView;

