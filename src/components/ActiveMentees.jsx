import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/ActiveMentees.css";
import Image1 from "../assets/images/carti.jpg"; // Local image

const ActiveMentees = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/76d0c440-3e51-499c-a5b3-ca9b3b97c8b2") // Dummy API
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredStudents = students.filter((student) => {
    if (filter === "defaulters") {
      return student.attendance < 75 && student.attendance >= 50;
    } else if (filter === "critical") {
      return student.attendance < 50;
    }
    return true;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="student--list">
      <div className="list--header">
        <h2>Active Mentees</h2>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Students</option>
          <option value="defaulters">Defaulters (Attendance &lt; 75%)</option>
          <option value="critical">
            Critical Defaulters (Attendance &lt; 50%)
          </option>
        </select>
      </div>
      <div className="table--header">
        <div className="column">Name</div>
        <div className="column">Branch</div>
        <div className="column semester">Semester</div>
        <div className="column attendance">Attendance</div>
      </div>
      <div className="list--container">
        {filteredStudents.map((student, index) => (
          <Link
            to={`/student-detail/${student.prn}`} // Route to student detail page with PRN
            key={index}
            className="student--link"
          >
            <div className="list">
              <div className="column student--detail">
                <img src={Image1} alt={student.name} />
                <span>{student.name}</span>
              </div>
              <div className="column">{student.branch || "N/A"}</div>
              <div className="column semester">{student.semester || "N/A"}</div>
              <div className="column attendance">{student.attendance}%</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActiveMentees;
