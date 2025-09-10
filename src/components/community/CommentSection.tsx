import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VotingButtons from './VotingButtons';
import { Comment } from '../../types/community';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string, author: string, parentId?: string) => void;
  onVoteComment: (commentId: string, voteType: 'up' | 'down') => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
  onVoteComment
}) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('Anonymous');

  const handleSubmitComment = (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment(newComment.trim(), commentAuthor, parentId);
    setNewComment('');
    setCommentAuthor('Anonymous');
    setShowCommentForm(false);
    setReplyTo(null);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Group comments by parent/child relationship
  const topLevelComments = comments.filter(comment => !comment.parentId);
  
  const getReplies = (parentId: string) => {
    return comments.filter(comment => comment.parentId === parentId);
  };

  const CommentForm = ({ parentId }: { parentId?: string }) => (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={(e) => handleSubmitComment(e, parentId)}
      className="bg-gray-50 rounded-lg p-4 mt-3"
    >
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Share your thoughts..."
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-calm-blue-500 resize-none"
        required
      />
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-3">
          <select
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-calm-blue-500"
          >
            <option value="Anonymous">Anonymous</option>
            <option value="Student">Student</option>
            <option value="Helper">Helper</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-calm-blue-600 text-white text-sm rounded-lg hover:bg-calm-blue-700 transition-colors"
          >
            Post
          </button>
          <button
            type="button"
            onClick={() => {
              setShowCommentForm(false);
              setReplyTo(null);
              setNewComment('');
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.form>
  );

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-900">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </h4>
        <button
          onClick={() => setShowCommentForm(!showCommentForm)}
          className="text-sm text-calm-blue-600 hover:text-calm-blue-700 font-medium"
        >
          Add Comment
        </button>
      </div>

      <AnimatePresence>
        {showCommentForm && !replyTo && <CommentForm />}
      </AnimatePresence>

      <div className="space-y-4 mt-4">
        {topLevelComments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex gap-3">
              <VotingButtons
                votes={comment.votes}
                userVote={comment.userVote}
                onVote={(type) => onVoteComment(comment.id, type)}
                size="sm"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {comment.author}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(comment.timestamp)}
                  </span>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                  {comment.content}
                </p>
                
                <button
                  onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                  className="text-xs text-calm-blue-600 hover:text-calm-blue-700 font-medium"
                >
                  Reply
                </button>

                <AnimatePresence>
                  {replyTo === comment.id && (
                    <CommentForm parentId={comment.id} />
                  )}
                </AnimatePresence>

                {/* Nested replies */}
                {getReplies(comment.id).length > 0 && (
                  <div className="mt-3 pl-4 border-l-2 border-gray-200 space-y-3">
                    {getReplies(comment.id).map((reply) => (
                      <motion.div
                        key={reply.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-lg p-3"
                      >
                        <div className="flex gap-2">
                          <VotingButtons
                            votes={reply.votes}
                            userVote={reply.userVote}
                            onVote={(type) => onVoteComment(reply.id, type)}
                            size="sm"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-gray-900">
                                {reply.author}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(reply.timestamp)}
                              </span>
                            </div>
                            <p className="text-gray-700 text-xs leading-relaxed">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
