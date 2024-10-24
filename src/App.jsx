import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Profile from './components/Profile';
import MenteeQueries from './components/MenteeQueries';
import Settings from './components/Settings';
import ScoreCard from './components/ScoreCard';
import StudentDetail from './components/StudentDetail'; // Import StudentDetail component
import './App.css';

const App = () => {
  return (
    <Router>
      <div className='dashboard'>
        <Sidebar />  {/* Sidebar is fixed on the left */}
        <div className="dashboard--content">
          <Routes>
            {/* Default route redirects to the dashboard with a sample PRN */}
            <Route path="/" element={<Navigate to="/dashboard/PRN001" />} />

            {/* Dashboard route showing Content and Profile for a specific PRN */}
            <Route path="/dashboard/:prn" element={<><Content /><Profile /></>} />

            {/* Mentee Queries and Settings routes for a specific PRN */}
            <Route path="/mentee-queries/:prn" element={<MenteeQueries />} />
            <Route path="/settings/:prn" element={<Settings />} />

            {/* ScoreCard route for a specific PRN */}
            <Route path="/score-card/:prn" element={<ScoreCard />} />

            {/* Mentor-view of the Mentee's filled form (Student Detail route) */}
            <Route path="/student-detail/:prn" element={<StudentDetail />} />  {/* Displays the form data filled by mentee */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
