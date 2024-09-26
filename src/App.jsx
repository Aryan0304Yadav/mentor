import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Profile from './components/Profile';
import MenteeQueries from './components/MenteeQueries'; // Import MenteeQueries
import Settings from './components/Settings'; // Import Settings
import ScoreCard from './components/ScoreCard'; // Import ScoreCard
import './App.css';

const App = () => {
  return (
    <Router>
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard--content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/PRN001" />} />
            <Route path="/dashboard/:prn" element={<><Content /><Profile /></>} />
            <Route path="/mentee-queries/:prn" element={<MenteeQueries />} />
            <Route path="/settings/:prn" element={<Settings />} />
            <Route path="/score-card/:prn" element={<ScoreCard />} /> {/* Add the ScoreCard route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
