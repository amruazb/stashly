import React, { useState } from 'react';

function LeaderboardModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  // Mock leaderboard data
  const leaderboard = [
    { name: 'Anonymous Owl', score: 120 },
    { name: 'Anonymous Fox', score: 110 },
    { name: 'Anonymous Tiger', score: 105 },
    { name: 'Anonymous Panda', score: 100 },
    { name: 'Anonymous Dolphin', score: 95 },
  ];
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Leaderboard</h2>
        <ol className="space-y-2">
          {leaderboard.map((entry, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{idx + 1}. {entry.name}</span>
              <span className="font-semibold">{entry.score}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function LeaderboardCard() {
  // Mock leaderboard data (same as modal)
  const leaderboard = [
    { name: 'Anonymous Owl', score: 120 },
    { name: 'Anonymous Fox', score: 110 },
    { name: 'Anonymous Tiger', score: 105 },
    { name: 'Anonymous Panda', score: 100 },
    { name: 'Anonymous Dolphin', score: 95 },
  ];
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-80 mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Leaderboard</h2>
      <ol className="space-y-2">
        {leaderboard.map((entry, idx) => (
          <li key={idx} className="flex justify-between">
            <span>{idx + 1}. {entry.name}</span>
            <span className="font-semibold">{entry.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function App() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <span className="font-bold text-lg">Project Bolt</span>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={() => setShowLeaderboard(true)}
        >
          Leaderboard
        </button>
      </nav>
      {/* Leaderboard Card (on dashboard) */}
      <LeaderboardCard />
      {/* Main Content */}
      <div className="flex items-center justify-center h-[60vh]">
        <p>Start prompting (or editing) to see magic happen :)</p>
      </div>
      {/* Leaderboard Modal */}
      <LeaderboardModal isOpen={showLeaderboard} onClose={() => setShowLeaderboard(false)} />
    </div>
  );
}

export default App;
