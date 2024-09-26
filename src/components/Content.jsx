import React from "react";
import ContentHeader from "./ContentHeader";
import '../styles/content.css';
import Card from "./Card";
import StudentList from "./StudentList";

const Content = () => {
  return (
    <div className="content">
      <ContentHeader />
      <Card />
      <StudentList></StudentList>
    </div>
  );
};

export default Content;
