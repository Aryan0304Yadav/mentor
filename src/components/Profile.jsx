import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileHeader from "./ProfileHeader";
import "../styles/profile.css";
import profileImage from "../assets/images/wlr.jpg";

const Profile = () => {
  const mentorId = "MENTOR001"; // Replace with dynamic mentor ID if needed
  const [mentorData, setMentorData] = useState({
    name: "",
    department: "",
    designation: "",
    batches: [],
    subjects: [],
    facultyId: "",
  });

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await axios.get(
          `https://run.mocky.io/v3/d451b463-342a-403e-b8a1-cf0080bd7487` // Update with your backend endpoint
        );
        const mentorDetails = response.data;
        setMentorData({
          name: mentorDetails.name,
          department: mentorDetails.department,
          designation: mentorDetails.designation,
          batches: mentorDetails.batches,
          subjects: mentorDetails.subjects,
          facultyId: mentorDetails.facultyId,
        });
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };

    fetchMentorData();
  }, [mentorId]);

  return (
    <div className="profile">
      <ProfileHeader />
      <div className="user--profile">
        <div className="user--image">
          <img src={profileImage} alt="Mentor Profile" />
        </div>
        <div className="user--detail">
          <h4>Name: {mentorData.name}</h4>
          <h4>Department: {mentorData.department}</h4>
          <h4>Designation: {mentorData.designation}</h4>
          <h4>Batches: {mentorData.batches.join(", ")}</h4>
          <h4>Subjects: {mentorData.subjects.join(", ")}</h4>
          <h4>Faculty ID: {mentorData.facultyId}</h4>
        </div>
      </div>
    </div>
  );
};

export default Profile;
