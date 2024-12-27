import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiHome, BiUser, BiCheckCircle, BiCalendar, BiBook } from 'react-icons/bi';
import "../styles/sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const prn = "PRN001"; // Static PRN value for now

  return (
    <div className="menu">
      <div className="logo">
        <Link to={`/dashboard/${prn}`} className="logo-link">
          <h2>SIES GST</h2>
        </Link>
      </div>
      <div className="menu--list">
        {/* Dashboard */}
        <Link
          to={`/dashboard/${prn}`}
          className={`item ${location.pathname === `/dashboard/${prn}` ? "active" : ""}`}
        >
          <BiHome className="icon" />
          Dashboard
        </Link>

        {/* Active Mentees */}
        <Link
          to={`/active-mentees/${prn}`}
          className={`item ${location.pathname === `/active-mentees/${prn}` ? "active" : ""}`}
        >
          <BiUser className="icon" />
          Active Mentees
        </Link>

        {/* Changes for Approval */}
        <Link
          to={`/changes-for-approval/${prn}`}
          className={`item ${location.pathname === `/changes-for-approval/${prn}` ? "active" : ""}`}
        >
          <BiCheckCircle className="icon" />
          Changes for Approval
        </Link>

        {/* Leave Approval */}
        <Link
          to={`/leave-approval/${prn}`}
          className={`item ${location.pathname === `/leave-approval/${prn}` ? "active" : ""}`}
        >
          <BiCalendar className="icon" />
          Leave Approval
        </Link>

        {/* Mentor Observations */}
        <Link
          to={`/mentor-observations/${prn}`}
          className={`item ${location.pathname === `/mentor-observations/${prn}` ? "active" : ""}`}
        >
          <BiBook className="icon" />
          Mentor Observations
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
  