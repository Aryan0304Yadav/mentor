import React from "react";
import { BiSearch, BiNotification, BiCog } from "react-icons/bi";
import '../styles/content.css';

const Content = () => {
  return (
    <div className="content--header">
      <h1 className="header--title">Mentor Dashboard</h1>
      <div className="header--activity">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <BiSearch className="icon" />
        </div>
        
        <div className="notify">
          <BiNotification className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Content;
