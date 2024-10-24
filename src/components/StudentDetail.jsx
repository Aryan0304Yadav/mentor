import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Use useParams to get prn from URL
import axios from 'axios';  // Import axios for fetching data
import '../styles/StudentDetail.css'; 

const StudentDetail = () => {
  const { prn } = useParams(); // Get PRN from URL parameters
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        // Replace the URL with your actual API endpoint for fetching student data by PRN
        const response = await axios.get(`https://run.mocky.io/v3/f65fadd7-576c-42a4-88bd-effad6e4498c`);
        const students = response.data;

        // Find the student by prn
        const foundStudent = students.find(student => student.prn === prn);
        if (foundStudent) {
          setStudent(foundStudent);  // Set the fetched student data
        } else {
          setError('Student not found');
        }

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (prn) {
      fetchStudentDetails();  // Fetch student details when PRN is available
    }
  }, [prn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!student) {
    return <div>No student details found.</div>;
  }

  return (
    <div className="student--details">
      <h2>{student.fullname}'s Details</h2>
      <div className="detail--section">
        <p><strong>Full Name:</strong> {student.fullname}</p>
        <p><strong>Date of Birth:</strong> {student.date_of_birth}</p>
        <p><strong>Year of Admission:</strong> {student.year_of_admission}</p>
        <p><strong>Mother Tongue:</strong> {student.mother_tongue}</p>
        <p><strong>Branch:</strong> {student.branch}</p>
        <p className="full-width"><strong>Current Address:</strong> {student.current_address}</p>
        <p><strong>Email:</strong> {student.email}</p>

        <h3>Family Details:</h3>
        <p><strong>Father's Name:</strong> {student.father_name}</p>
        <p><strong>Father's Occupation:</strong> {student.father_occupation}</p>
        <p><strong>Father's Phone Number:</strong> {student.father_mobile_number}</p>
        <p><strong>Mother's Name:</strong> {student.mother_name}</p>
        <p><strong>Mother's Occupation:</strong> {student.mother_occupation}</p>
        <p><strong>Mother's Phone Number:</strong> {student.mother_mobile_number}</p>

        <h3>Residence Details:</h3>
        <p><strong>Residence Option:</strong> {student.residenceOption}</p>
        {student.residenceOption === "relative" && (
          <>
            <p><strong>Relative's Name:</strong> {student.relativeName}</p>
            <p><strong>Relative's Contact:</strong> {student.relativeContact}</p>
          </>
        )}
        {student.residenceOption === "guardian" && (
          <>
            <p><strong>Guardian's Name:</strong> {student.guardianName}</p>
            <p><strong>Guardian's Contact:</strong> {student.guardianContact}</p>
          </>
        )}
        {student.residenceOption === "friend" && (
          <>
            <p><strong>Friend's Name:</strong> {student.friendName}</p>
            <p><strong>Friend's Contact:</strong> {student.friendContact}</p>
          </>
        )}
        {student.residenceOption === "hostel" && (
          <>
            <p><strong>Hostel's Name:</strong> {student.hostelName}</p>
            <p><strong>Hostel's Contact:</strong> {student.hostelContact}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;
