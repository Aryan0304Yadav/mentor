import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/StudentList.css';
import Image1 from '../assets/images/carti.jpg'; 

const StudentList = () => {
  const [students, setStudents] = useState([]); // State for students
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetching students data (mocked for now)
    // axios.get('https://jsonplaceholder.typicode.com/users')
    axios.get('https://mentor-mentee-backend.vercel.app/mentors')


      .then(response => {
        setStudents(response.data); // Assuming response contains the student data
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='student--list'>
      <div className="list--header">
        <h2>Students</h2>
        <select>
          <option value='batch1'>H1</option>
          <option value='batch2'>H2</option>
          <option value='batch3'>H3</option>
        </select>
      </div>
      <div className="list--container">
        {students.map((student, index) => (
          <div className='list' key={index}>
            <div className="student--detail">
              <img src={student.image || Image1} alt={student.name}></img>
              <h2>{student.name}</h2>
            </div>
            <span>Branch: {student.branch}</span>
            <span>Semester: {student.semester}</span>
            <span className='student--todo'>:</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentList;
