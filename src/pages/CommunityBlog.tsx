import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostForm from '../components/community/PostForm';
import PostCard from '../components/community/PostCard';
import TagFilter from '../components/community/TagFilter';
import { Post, Comment, CommunityState, STORAGE_KEY_COMMUNITY } from '../types/community';

// Mock seed data
const seedPosts: Post[] = [
  {
    id: '1',
    title: 'How I manage exam stress without burning out',
    content: `I used to panic before every exam, but I've found some strategies that really help:\n\n1. Break study sessions into 25-minute chunks\n2. Take actual breaks (not just scrolling social media)\n3. Practice breathing exercises before the exam\n4. Remember that one exam doesn't define me\n\nHope this helps someone else who's struggling with exam anxiety!`,
    author: 'StudyBuddy',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    tags: ['Exams', 'Stress', 'Tips'],
    votes: 12,
    commentCount: 3,
    comments: [
      {
        id: 'c1',
        postId: '1',
        content: 'This is so helpful! The 25-minute thing really works for me too.',
        author: 'Anonymous',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        votes: 5
      },
      {
        id: 'c2',
        postId: '1',
        content: 'What breathing exercises do you recommend?',
        author: 'Helper',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        votes: 2
      }
    ]
  },
  {
    id: '2',
    title: 'Finding motivation when everything feels overwhelming',
    content: `Been struggling lately with feeling like there's too much to do and not enough time. Started a gratitude journal last week and it's helping me focus on small wins instead of everything I haven't done yet.\n\nSome days I just write "I got out of bed" and that's okay too.`,
    author: 'Anonymous',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    tags: ['Motivation', 'Self-care', 'Tips'],
    votes: 8,
    commentCount: 2,
    comments: [
      {
        id: 'c3',
        postId: '2',
        content: 'Thanks for sharing this. Sometimes the smallest things feel like huge accomplishments.',
        author: 'Anonymous',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        votes: 6
      }
    ]
  },
  {
    id: '3',
    title: 'Sleep schedule completely messed up',
    content: `Anyone else find their sleep totally ruined during finals? I've been staying up until 3am and then feeling terrible the next day. Need to fix this but don't know where to start.`,
    author: 'NightOwl',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    tags: ['Sleep', 'Struggle'],
    votes: -2,
    commentCount: 4,
    comments: [
      {
        id: 'c4',
        postId: '3',
        content: 'Try setting a phone alarm 1 hour before you want to sleep, then put your phone in another room.',
        author: 'EarlyBird',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        votes: 8
      }
    ]
  }
];

const initialState: CommunityState = {
  posts: seedPosts,
  selectedTags: [],
  sortBy: 'newest'
};

const CommunityBlog: React.FC = () => {
  const [state, setState] = useState<CommunityState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_COMMUNITY);
    if (saved) {
      try {
        return JSON.parse(saved) as CommunityState;
      } catch {}
    }
    return initialState;
  });

  const [showPostForm, setShowPostForm] = useState(false);

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_COMMUNITY, JSON.stringify(state));
  }, [state]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = state.posts;
    
    // Apply tag filter
    if (state.selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        post.tags.some(tag => state.selectedTags.includes(tag))
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (state.sortBy) {
        case 'newest':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'oldest':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case 'top':
          return b.votes - a.votes;
        case 'controversial':
          return Math.abs(a.votes) - Math.abs(b.votes);
        default:
          return 0;
      }
    });

    return sorted;
  }, [state.posts, state.selectedTags, state.sortBy]);

  const handleCreatePost = (postData: {
    title: string;
    content: string;
    author: string;
    tags: string[];
  }) => {
    const newPost: Post = {
      id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      title: postData.title,
      content: postData.content,
      author: postData.author,
      timestamp: new Date().toISOString(),
      tags: postData.tags,
      votes: 0,
      commentCount: 0,
      comments: []
    };

    setState(prev => ({
      ...prev,
      posts: [newPost, ...prev.posts]
    }));
    setShowPostForm(false);
  };

  const handleVotePost = (postId: string, voteType: 'up' | 'down') => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.map(post => {
        if (post.id === postId) {
          const currentVote = post.userVote;
          let newVotes = post.votes;
          let newUserVote: 'up' | 'down' | null = voteType;

          // Handle vote logic
          if (currentVote === voteType) {
            // Remove vote
            newVotes += voteType === 'up' ? -1 : 1;
            newUserVote = null;
          } else if (currentVote) {
            // Change vote
            newVotes += voteType === 'up' ? 2 : -2;
          } else {
            // New vote
            newVotes += voteType === 'up' ? 1 : -1;
          }

          return { ...post, votes: newVotes, userVote: newUserVote };
        }
        return post;
      })
    }));
  };

  const handleAddComment = (postId: string, content: string, author: string, parentId?: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      postId,
      parentId,
      content,
      author,
      timestamp: new Date().toISOString(),
      votes: 0
    };

    setState(prev => ({
      ...prev,
      posts: prev.posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment],
            commentCount: post.commentCount + 1
          };
        }
        return post;
      })
    }));
  };

  const handleVoteComment = (postId: string, commentId: string, voteType: 'up' | 'down') => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment => {
              if (comment.id === commentId) {
                const currentVote = comment.userVote;
                let newVotes = comment.votes;
                let newUserVote: 'up' | 'down' | null = voteType;

                if (currentVote === voteType) {
                  newVotes += voteType === 'up' ? -1 : 1;
                  newUserVote = null;
                } else if (currentVote) {
                  newVotes += voteType === 'up' ? 2 : -2;
                } else {
                  newVotes += voteType === 'up' ? 1 : -1;
                }

                return { ...comment, votes: newVotes, userVote: newUserVote };
              }
              return comment;
            })
          };
        }
        return post;
      })
    }));
  };

  const handleTagToggle = (tag: string) => {
    setState(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }));
  };

  const handleClearTags = () => {
    setState(prev => ({ ...prev, selectedTags: [] }));
  };

  const handleSortChange = (sortBy: CommunityState['sortBy']) => {
    setState(prev => ({ ...prev, sortBy }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-blue-50 via-white to-lavender-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Community Blog 💬
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Share experiences, tips, and support with fellow students. Your voice matters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Create Post Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPostForm(true)}
              className="w-full bg-calm-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-calm-blue-700 transition-colors shadow-lg"
            >
              Create Post ✍️
            </motion.button>

            {/* Sort Options */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Sort by</h3>
              <div className="space-y-2">
                {[
                  { value: 'newest', label: 'Newest' },
                  { value: 'top', label: 'Most voted' },
                  { value: 'oldest', label: 'Oldest' },
                  { value: 'controversial', label: 'Controversial' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      value={option.value}
                      checked={state.sortBy === option.value}
                      onChange={() => handleSortChange(option.value as CommunityState['sortBy'])}
                      className="mr-2 text-calm-blue-600"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <TagFilter
              selectedTags={state.selectedTags}
              onTagToggle={handleTagToggle}
              onClearAll={handleClearTags}
            />

            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Community</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>{state.posts.length} posts</div>
                <div>{state.posts.reduce((sum, p) => sum + p.commentCount, 0)} comments</div>
                <div>Supporting each other 💙</div>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-3">
            <AnimatePresence>
              {showPostForm && (
                <PostForm
                  onSubmit={handleCreatePost}
                  onCancel={() => setShowPostForm(false)}
                />
              )}
            </AnimatePresence>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredAndSortedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onVotePost={handleVotePost}
                  onAddComment={handleAddComment}
                  onVoteComment={handleVoteComment}
                />
              ))}

              {filteredAndSortedPosts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600 mb-4">
                    {state.selectedTags.length > 0 
                      ? 'Try adjusting your filter or create the first post with these tags!'
                      : 'Be the first to share your experience with the community!'
                    }
                  </p>
                  <button
                    onClick={() => setShowPostForm(true)}
                    className="px-6 py-2 bg-calm-blue-600 text-white rounded-lg hover:bg-calm-blue-700 transition-colors"
                  >
                    Create Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityBlog;
