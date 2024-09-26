import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiHome,BiUser, BiComment, BiCog } from 'react-icons/bi';
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
        <Link
          to={`/dashboard/${prn}`}
          className={`item ${location.pathname === `/dashboard/${prn}` ? "active" : ""}`}
        >
          <BiHome className="icon" />
          Dashboard
        </Link>

        <Link
          to={`/student-list/${prn}`}
          className={`item ${location.pathname === `/student-list/${prn}` ? "active" : ""}`}
        >
          <BiUser className="icon" />
          Student List
        </Link>

        <Link
          to={`/mentee-queries/${prn}`}
          className={`item ${location.pathname === `/mentee-queries/${prn}` ? "active" : ""}`}
        >
          <BiComment className="icon" />
          Mentee Queries
        </Link>

        <Link
          to={`/settings/${prn}`}
          className={`item ${location.pathname === `/settings/${prn}` ? "active" : ""}`}
        >
          <BiCog className="icon" />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
