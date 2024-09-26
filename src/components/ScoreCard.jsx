import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ScoreCard.css'; // Make sure to update the CSS file
import Image1 from '../assets/images/carti.jpg'; // Static placeholder image

const ScoreBoard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('overall'); // Default category

  useEffect(() => {
    // Fetch student data
    const fetchStudents = async () => {
      try {
        // const response = await axios.get('/student.json'); // Make sure the path is correct
        const response = await axios.get('https://mentor-mentee-backend.vercel.app/mentors'); // Make sure the path is correct

        const formattedData = response.data.map(student => ({
          // name: student.name,
          name: student.fullname,
          academics: student.academics,
          sports: student.sports,
          events: student.events,
          image: Image1, // Use your static image
        }));

        setStudents(formattedData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const categorizeStudents = (students) => {
    return students.map(student => {
      let score;
      let categoryScore;

      // Calculate the weighted score based on the selected category
      switch (category) {
        case 'academics':
          score = student.academics;
          categoryScore = student.academics >= 70 ? 'green' : student.academics >= 50 ? 'yellow' : 'red';
          break;
        case 'sports':
          score = student.sports;
          categoryScore = student.sports >= 70 ? 'green' : student.sports >= 50 ? 'yellow' : 'red';
          break;
        case 'events':
          score = student.events;
          categoryScore = student.events >= 70 ? 'green' : student.events >= 50 ? 'yellow' : 'red';
          break;
        default: // overall
          score = (student.academics * 0.6) + (student.sports * 0.2) + (student.events * 0.2);
          categoryScore = score >= 70 ? 'green' : score >= 50 ? 'yellow' : 'red';
      }

      return {
        ...student,
        score, // Use the score calculated above
        category: categoryScore
      };
    }).sort((a, b) => b.score - a.score); // Sort by selected score in descending order
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const updatedStudents = categorizeStudents(students);

  return (
    <div className='leaderboard--container'>
      <div className="leaderboard--header">
        <h2>Leaderboard</h2>
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value='overall'>Overall</option>
          <option value='academics'>Academics</option>
          <option value='sports'>Sports</option>
          <option value='events'>Events</option>
        </select>
      </div>
      <div className="leaderboard--list">
        {updatedStudents.map((student, index) => (
          <div className={`leaderboard--item ${student.category}`} key={index}>
            <div className="student--detail">
              <img src={student.image} alt={student.name} />
              <div className="student--info">
                <h3>{student.name}</h3>
              </div>
            </div>
            <span>{category.charAt(0).toUpperCase() + category.slice(1)} Score: {student.score.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
