import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Goals', path: '/goals' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'AI Assistant', path: '/ai-assistant' },
    { name: 'Support', path: '/support' },
  ];
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex gap-12 mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`font-bold text-lg transition hover:text-blue-600 ${location.pathname === item.path ? 'text-blue-600' : 'text-gray-800'}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div>
        <span className="inline-block w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-green-300 flex items-center justify-center text-4xl">
          <span role="img" aria-label="avatar">🧑‍🎓</span>
        </span>
      </div>
    </nav>
  );
}

function Dashboard() {
  return <div className="p-8 text-center text-2xl">Welcome to the Dashboard!</div>;
}
function Goals() {
  return <div className="p-8 text-center text-2xl">Your Goals will appear here.</div>;
}
function Rewards() {
  return <div className="p-8 text-center text-2xl">Check your Rewards here.</div>;
}
function AIAssistant() {
  return <div className="p-8 text-center text-2xl">AI Assistant is ready to help you.</div>;
}
function Support() {
  return <div className="p-8 text-center text-2xl">Support page coming soon.</div>;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </div>
  );
}

export default App;
