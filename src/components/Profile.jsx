import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from 'axios';
import ProfileHeader from './ProfileHeader';
import '../styles/profile.css';
import profileImage from '../assets/images/wlr.jpg'; 

const Profile = () => {
  // const { prn } = useParams();
  const prn = 'PRN001';
  const [userData, setUserData] = useState({
    name: '',
    rollNumber: '',
    branch: '',
    batch: '',
    email: ''
  });

  useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get('https://jsonkeeper.com/b/XXXX'); 
  //       setUserData({
  //         name: response.data.name,
  //         rollNumber: response.data.rollNumber,
  //         branch: response.data.branch,
  //         batch: response.data.batch,
  //         email: response.data.email
  //       });
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://mentor-mentee-backend.vercel.app/students/${prn}`); 
        const userData = response.data
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
      if(prn){
        fetchUserData();
      }
  }, [prn]);

  return (
    <div className="profile">
      <ProfileHeader />
      <div className="user--profile">
        <div className="user--image">
          <img src={profileImage} alt="User Profile" />
        </div>
        <div className="user--detail">
          <h3 className="username">{userData.name}</h3>
          <h4>PRN: {userData.prn}</h4>
          <h4>Branch: {userData.branch}</h4>
          <h4>Batch: {userData.batch}</h4>
          <h4>Email: {userData.email}</h4>
        </div>
      </div>
    </div>
  );
}

export default Profile;
