import React, { useState, useEffect } from "react";
import "../styles/DashboardTable.css";
import axios from "axios";

const DashboardTable = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("all");

  useEffect(() => {
    // Dummy API for fetching batches
    axios
      .get("https://run.mocky.io/v3/f57e5a01-5190-43e3-9797-a4c1fec4c839") // Replace with your API
      .then((response) => {
        setBatches(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Filtered batches based on search and semester filter
  const filteredBatches = batches.filter((batch) => {
    const matchesSearch = batch.batchName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSemester =
      semesterFilter === "all" || batch.semester === parseInt(semesterFilter, 10);
    return matchesSearch && matchesSemester;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard--table">
      <div className="table--controls">
        <input
          type="text"
          placeholder="Search by Batch"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={(e) => setSemesterFilter(e.target.value)} value={semesterFilter}>
          <option value="all">All Semesters</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
          <option value="4">Semester 4</option>
          <option value="5">Semester 5</option>
          <option value="6">Semester 6</option>
          <option value="7">Semester 7</option>
          <option value="8">Semester 8</option>
        </select>
      </div>
      <div className="table--header">
        <div className="column">Batch</div>
        <div className="column">Branch</div>
        <div className="column">Semester</div>
        <div className="column">Number of Mentees</div>
      </div>
      <div className="table--body scrollable-container">
        {filteredBatches.map((batch, index) => (
          <div key={index} className="table--row">
            <div className="column">{batch.batchName}</div>
            <div className="column">{batch.branch}</div>
            <div className="column">{batch.semester}</div>
            <div className="column">{batch.menteesCount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardTable;
