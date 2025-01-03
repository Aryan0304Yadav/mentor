import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import '../styles/AttendanceChart.css';

const ChartComponent = () => {
  const chartRef = useRef(null);
  const [chartType, setChartType] = useState('bar'); // Default chart type is bar
  const [attendanceType, setAttendanceType] = useState('theory'); // Default attendance type is theory
  const [attendanceData, setAttendanceData] = useState([]); // State to store fetched data
  const [mentorName, setMentorName] = useState(''); // State for mentor name
  const myChartRef = useRef(null);

  // Fetch the mentee data and attendance data from Mocky API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://run.mocky.io/v3/97f4fe3c-47b5-4017-a867-103ffd189636'); // Replace with your Mocky API URL
        const { mentorName, attendance } = response.data;
        setMentorName(mentorName); // Set mentor name dynamically
        setAttendanceData(attendance); // Set attendance data dynamically
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (myChartRef.current) {
      myChartRef.current.destroy(); // Destroy existing chart instance if it exists
    }

    // Prepare the labels (subjects) and data (attendance values)
    const subjects = attendanceData.map((item) => item.subject); // Extract subjects
    const attendanceValues = attendanceData.map((item) =>
      attendanceType === 'theory' ? item.theory : item.lab
    ); // Extract attendance values based on type (theory/lab)

    const ctx = chartRef.current.getContext('2d');
    myChartRef.current = new Chart(ctx, {
      type: chartType,
      data: {
        labels: subjects, // Use subjects for x-axis labels
        datasets: [
          {
            label: attendanceType === 'theory' ? 'Theory Attendance' : 'Lab Attendance',
            data: attendanceValues, // Use the filtered attendance data
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [chartType, attendanceType, attendanceData]);

  return (
    <div className="chart">
      <div className="dropdowns">
        <label>
          Attendance Type:
          <select value={attendanceType} onChange={(e) => setAttendanceType(e.target.value)}>
            <option value="theory">Theory</option>
            <option value="lab">Lab</option>
          </select>
        </label>

        <label>
          Chart Type:
          <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="doughnut">Doughnut</option>
            <option value="polarArea">Polar Area</option>
            <option value="radar">Radar</option>
          </select>
        </label>

        <div className="mentor-assigned">
          <label>Mentor Assigned:</label>
          <select className="mentor-dropdown" disabled>
            <option>{mentorName || 'Loading...'}</option>
          </select>
        </div>
      </div>

      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;
