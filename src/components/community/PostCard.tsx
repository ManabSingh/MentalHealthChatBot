import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VotingButtons from './VotingButtons';
import CommentSection from './CommentSection';
import { Post } from '../../types/community';

interface PostCardProps {
  post: Post;
  onVotePost: (postId: string, voteType: 'up' | 'down') => void;
  onAddComment: (postId: string, content: string, author: string, parentId?: string) => void;
  onVoteComment: (postId: string, commentId: string, voteType: 'up' | 'down') => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onVotePost,
  onAddComment,
  onVoteComment
}) => {
  const [showComments, setShowComments] = useState(false);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex gap-4">
          {/* Voting Section */}
          <VotingButtons
            votes={post.votes}
            userVote={post.userVote}
            onVote={(type) => onVotePost(post.id, type)}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Post Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-gray-900">
                {post.author}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(post.timestamp)}
              </span>
            </div>

            {/* Post Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
              {post.title}
            </h3>

            {/* Post Content */}
            <div className="text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
              {post.content}
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium bg-calm-blue-100 text-calm-blue-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-1 hover:text-calm-blue-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>
                  {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
                </span>
              </motion.button>

              <button className="flex items-center gap-1 hover:text-calm-blue-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                <span>Share</span>
              </button>

              <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <CommentSection
                comments={post.comments}
                onAddComment={(content, author, parentId) => 
                  onAddComment(post.id, content, author, parentId)
                }
                onVoteComment={(commentId, voteType) => 
                  onVoteComment(post.id, commentId, voteType)
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PostCard;
