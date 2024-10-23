import React from 'react';

const AttendanceTable = ({ attendanceData }) => {
  if (!attendanceData || !attendanceData.theory || !attendanceData.practical || !attendanceData.dates) {
    return <div>Loading...</div>; // Loading state or error message
  }

  const { theory, practical, dates } = attendanceData;

  // Ensure unique dates
  const uniqueDates = [...new Set(dates)];

  // Get the subjects for both theory and practical attendance
  const subjects = Object.keys(theory);

  // Render rows for the attendance table (both theory and practical)
  const renderTableRows = (data) => {
    return subjects.map((subject) => {
      let lastNumber = 0;
      return (
        <tr key={subject}>
          <td className="subject-cell">{subject}</td>
          {data[subject].map((attendance, index) => {
            if (attendance === 1) {
              lastNumber += 1;
            }
            return (
              <td key={index} className={attendance === 1 ? 'present' : 'absent'}>
                {lastNumber}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <div className="attendance-tables">
      <div className="attendance-table">
        <h4>Theory</h4>
        <div className="table-wrapper">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="subject-header">Subject</th>
                  {uniqueDates.map((date) => (
                    <th key={date}>{date}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{renderTableRows(theory)}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="attendance-table">
        <h4>Practical</h4>
        <div className="table-wrapper">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="subject-header">Subject</th>
                  {uniqueDates.map((date) => (
                    <th key={date}>{date}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{renderTableRows(practical)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
