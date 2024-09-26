import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/content.css';
import { BiCalendar, BiTrophy, BiEdit } from "react-icons/bi";

const course = [
  {
    title: "Attendance",
    icon: <BiCalendar className="card-icon" />,
    path: '/attendance'  // Add a path for each card
  },
  {
    title: "Score Card",
    icon: <BiTrophy className="card-icon"/>,
    path: '/score-card/PRN001'  // This will navigate to the score card page
  },
  {
    title: "About you",
    icon: <BiEdit className="card-icon" />,
    path: '/about-you'
  },
];

const Card = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <div className="card--container">
      {course.map((item, index) => (
        <div 
          className="card" 
          key={index}
          onClick={() => handleClick(item.path)} // Handle card click
        >
          <div className="card--cover">{item.icon}</div>
          <div className="card--title">
            <h2>{item.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
