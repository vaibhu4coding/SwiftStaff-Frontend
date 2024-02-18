import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const HomeScreen: React.FC = () => {
  return (<div>
    <Navbar></Navbar>
    <div className="home-container">
      <div className="top-section">
      {/* <Link to="/attendance" style={{textDecoration:'none'}}>
        <div className="box attendance-box">
          Attendance Tracker
        </div>
        </Link> */}
        <Link to="/create-project" style={{textDecoration:'none'}}>
        <div className="box attendance-box">
          Create Project
        </div>
        </Link>
        <Link to="/employees" style={{textDecoration:'none'}}>
        <div className="box employee-list-box">
          Employee List
          </div>
        </Link>
      </div>
      <div className="bottom-section">
      <Link to="/projects" style={{textDecoration:'none'}}>
        <div className="box project-progress-box">
          Project Progress
          </div>
        </Link>
        <Link to="/create-employee" style={{textDecoration:'none'}}>
        <div className="box create-employee-box">
          Create Employee
          </div>
        </Link>
      </div>
    </div>
    </div>);
};

export default HomeScreen;