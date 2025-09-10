import React, { useEffect, useState } from 'react';
import TreeBackground from '../components/mindflights/TreeBackground';
import PaperNote from '../components/mindflights/PaperNote';
import PaperFoldAnimation from '../components/mindflights/PaperFoldAnimation';
import AirplaneFlight from '../components/mindflights/AirplaneFlight';
import UnfoldedMessage from '../components/mindflights/UnfoldedMessage';
import CatchPlane from '../components/mindflights/CatchPlane';
import { 
  PlaneMessage, 
  MindFlightsState, 
  seedMockPlanes,
  STORAGE_KEY_MINDFLIGHTS 
} from '../types/mindFlights';

const initialState: MindFlightsState = {
  pool: seedMockPlanes(),
};

const MindFlights: React.FC = () => {
  const [state, setState] = useState<MindFlightsState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_MINDFLIGHTS);
    if (saved) {
      try {
        return JSON.parse(saved) as MindFlightsState;
      } catch {}
    }
    return initialState;
  });

  const [writing, setWriting] = useState('');
  const [foldingPlane, setFoldingPlane] = useState<string | null>(null);
  const [caughtPlane, setCaughtPlane] = useState<PlaneMessage | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MINDFLIGHTS, JSON.stringify(state));
  }, [state]);

  const handleSend = () => {
    const text = writing.trim();
    if (!text) return;

    const newPlane: PlaneMessage = {
      id: `plane-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      content: text,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    setState((s) => ({
      ...s,
      pool: [...s.pool, newPlane],
      lastSentId: newPlane.id,
    }));

    setFoldingPlane(text);
    setWriting('');
  };

  const handleCatchPlane = () => {
    const available = state.pool.filter((p) => p.id !== state.lastSentId);
    if (available.length === 0) return;

    const randomIndex = Math.floor(Math.random() * available.length);
    setCaughtPlane(available[randomIndex]);
  };

  const handleReply = (replyText: string) => {
    if (!caughtPlane) return;

    const newReply = {
      id: `reply-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      content: replyText,
      createdAt: new Date().toISOString(),
    };

    setState((s) => ({
      ...s,
      pool: s.pool.map((plane) =>
        plane.id === caughtPlane.id
          ? { ...plane, replies: [...plane.replies, newReply] }
          : plane
      ),
    }));

    // Update the caught plane to show the new reply
    setCaughtPlane((current) =>
      current
        ? { ...current, replies: [...current.replies, newReply] }
        : current
    );
  };

  const handleCloseCaught = () => setCaughtPlane(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Scenic background */}
      <TreeBackground />
      <AirplaneFlight />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Mind Flights ✈️
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Share what's on your mind anonymously. Send your thoughts into the world, 
            and discover messages from other students who understand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Write and Send */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Share Your Thoughts
              </h2>
              <PaperNote
                value={writing}
                onChange={setWriting}
                onFold={handleSend}
              />
            </div>

            {/* How it Works */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How Mind Flights Works
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span>📝</span>
                  <span>Write about anything - stress, joy, worries, wins</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>✈️</span>
                  <span>Your message flies anonymously to the shared pool</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>🪃</span>
                  <span>Catch random planes from other students</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>💌</span>
                  <span>Reply with support - everything stays anonymous</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Catch and Read */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Discover Messages
              </h2>
              {!caughtPlane ? (
                <CatchPlane onCatch={handleCatchPlane} />
              ) : (
                <UnfoldedMessage
                  message={caughtPlane}
                  onClose={handleCloseCaught}
                  onReply={handleReply}
                />
              )}
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-soft-green-500 to-calm-blue-500 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Community Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold">{state.pool.length}</div>
                  <div className="text-sm text-white/80">Messages Shared</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {state.pool.reduce((sum, p) => sum + p.replies.length, 0)}
                  </div>
                  <div className="text-sm text-white/80">Replies Sent</div>
                </div>
              </div>
              <p className="text-xs text-white/70 mt-3">
                You're part of a supportive community ✨
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Folding + Flying Animation */}
      {foldingPlane && (
        <PaperFoldAnimation
          text={foldingPlane}
          onComplete={() => setFoldingPlane(null)}
        />
      )}
    </div>
  );
};

export default MindFlights;
