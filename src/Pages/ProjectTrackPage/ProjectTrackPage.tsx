import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './ProjectTrackage.css';
import Navbar from '../../components/Navbar/Navbar';

interface Project {
  projectId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  department: string;
}

interface Filters {
  department: string;
  status: string;
}

const ProjectTrackPage: React.FC = () => {
  const authToken = localStorage.getItem('adminToken');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<Filters>({
    department: '',
    status: ''
  });

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/projects', { params: filters, headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      }});
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters: Filters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar></Navbar>
    <div className="project-track-page">
      <h2>Project Tracking</h2>
      <div className="filter-options">
        <label>Department:</label>
        <input type="text" name="department" value={filters.department} onChange={handleInputChange} />

        <label>Status:</label>
        <input type="text" name="status" value={filters.status} onChange={handleInputChange} />

        <button onClick={fetchProjects}>Apply Filters</button>
      </div>

      <div className="project-list">
        <h3>Projects</h3>
        <table>
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.projectId}>
                <td>{project.projectId}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{project.status}</td>
                <td>{project.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </>
  );
};

export default ProjectTrackPage;
