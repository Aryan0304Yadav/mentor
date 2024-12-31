// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "../styles/ActiveMentees.css";
// import Image1 from "../assets/images/carti.jpg"; // Local image

// const ActiveMentees = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     axios
//       .get("https://run.mocky.io/v3/76d0c440-3e51-499c-a5b3-ca9b3b97c8b2") // Dummy API
//       .then((response) => {
//         setStudents(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   const filteredStudents = students.filter((student) => {
//     if (filter === "defaulters") {
//       return student.attendance < 75 && student.attendance >= 50;
//     } else if (filter === "critical") {
//       return student.attendance < 50;
//     }
//     return true;
//   });

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="student--list">
//       <div className="list--header">
//         <h2>Active Mentees</h2>
//         <select onChange={(e) => setFilter(e.target.value)}>
//           <option value="all">All Students</option>
//           <option value="defaulters">Defaulters (Attendance &lt; 75%)</option>
//           <option value="critical">
//             Critical Defaulters (Attendance &lt; 50%)
//           </option>
//         </select>
//       </div>
//       <div className="table--header">
//         <div className="column">Name</div>
//         <div className="column">Branch</div>
//         <div className="column semester">Semester</div>
//         <div className="column attendance">Attendance</div>
//       </div>
//       <div className="list--container">
//         {filteredStudents.map((student, index) => (
//           <Link
//             to={`/student-detail/${student.prn}`} // Route to student detail page with PRN
//             key={index}
//             className="student--link"
//           >
//             <div className="list">
//               <div className="column student--detail">
//                 <img src={Image1} alt={student.name} />
//                 <span>{student.name}</span>
//               </div>
//               <div className="column">{student.branch || "N/A"}</div>
//               <div className="column semester">{student.semester || "N/A"}</div>
//               <div className="column attendance">{student.attendance}%</div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ActiveMentees;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ActiveMentees.css";

const ActiveMentees = () => {
  const navigate = useNavigate();

  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://6769c71a863eaa5ac0dcab5a.mockapi.io/ActiveMentees"
        );
        setMentees(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMentees();
  }, []);

  // Filter mentees based on search and filters
  const filteredMentees = mentees.filter((mentee) => {
    const searchMatch =
      mentee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.prn?.toLowerCase().includes(searchTerm.toLowerCase());
  
    const batchMatch = !batchFilter || mentee.batch === batchFilter;
    const semesterMatch =
      !semesterFilter || mentee.semester.toLowerCase() === semesterFilter.toLowerCase();
    const branchMatch = !branchFilter || mentee.branch === branchFilter;
  
    return searchMatch && batchMatch && semesterMatch && branchMatch;
  });
  

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredMentees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedMentees = filteredMentees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleStudentClick = (studentId) => {
    navigate(`/student-detail-dummy/${studentId}`);
  };

  if (loading) return <div className="loading">Loading mentees data...</div>;
  if (error) return <div className="error">Error loading mentees: {error}</div>;

  return (
    <div className="mentee-dashboard">
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by Name or PRN..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="filter-controls">
          <select
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Batches</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>

          <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Semesters</option>
          <option value="Semester 1">Semester 1</option>
          <option value="Semester 2">Semester 2</option>
          <option value="Semester 3">Semester 3</option>
          <option value="Semester 4">Semester 4</option>
          <option value="Semester 5">Semester 5</option>
          <option value="Semester 6">Semester 6</option>
          <option value="Semester 7">Semester 7</option>
          <option value="Semester 8">Semester 8</option>
        </select>

          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Branches</option>
            <option value="CS">CS</option>
            <option value="IT">IT</option>
            <option value="AIML">AIML</option>
            <option value="AIDS">AIDS</option>
            <option value="IOT">IOT</option>
            <option value="ECS">ECS</option>
            <option value="EXTC">EXTC</option>
            <option value="Mechanical">Mechanical</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div className="header-cell">PRN/Serial No.</div>
          <div className="header-cell">Name</div>
          <div className="header-cell">Defaulter Status</div>
          <div className="header-cell">Learner Type</div>
          <div className="header-cell">Batch</div>
          <div className="header-cell">Semester</div>
          <div className="header-cell">Branch</div>
        </div>

        <div className="table-body">
          {displayedMentees.map((mentee, index) => (
            <div
              key={mentee.prn || index}
              className="table-row"
              onClick={() => handleStudentClick(mentee.id)}
            >
              <div className="table-cell">
                {mentee.prn || startIndex + index + 1}
              </div>
              <div className="table-cell">{mentee.name}</div>
              <div
                className={`table-cell ${
                  mentee.isDefaulter ? "defaulter" : "regular"
                }`}
              >
                {mentee.isDefaulter ? "Defaulter" : "Regular"}
              </div>
              <div
                className={`table-cell ${mentee.learnerType.toLowerCase()}-learner`}
              >
                {mentee.learnerType}
              </div>
              <div className="table-cell">{mentee.batch}</div>
              <div className="table-cell">{mentee.semester}</div>
              <div className="table-cell">{mentee.branch}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ActiveMentees;
