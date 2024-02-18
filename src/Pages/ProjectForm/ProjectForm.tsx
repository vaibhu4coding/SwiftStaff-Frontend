import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';

import './ProjectForm.css'; // Import CSS file

interface Project {
  projectId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  department: string;
}

const ProjectForm: React.FC = () => {
  const authToken = localStorage.getItem('adminToken');
  const [projectData, setProjectData] = useState<Project>({
    projectId: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: '',
    department: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/projects', projectData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      alert('Project created successfully');
      // Reset form after submission
      setProjectData({
        projectId: '',
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        status: '',
        department: '',
      });
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project');
    }
  };

  return (
    <>
      <Navbar />
      <div className="project-form"> {/* Add CSS class for styling */}
        <h2>Create Project</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Project ID:</label>
            <input type="text" name="projectId" value={projectData.projectId} onChange={handleInputChange} />
          </div>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={projectData.name} onChange={handleInputChange} />
          </div>
          <div>
            <label>Description:</label>
            <input type="text" name="description" value={projectData.description} onChange={handleInputChange} />
          </div>
          <div>
            <label>Start Date:</label>
            <input type="text" name="startDate" value={projectData.startDate} onChange={handleInputChange} />
          </div>
          <div>
            <label>End Date:</label>
            <input type="text" name="endDate" value={projectData.endDate} onChange={handleInputChange} />
          </div>
          <div>
            <label>Status:</label>
            <input type="text" name="status" value={projectData.status} onChange={handleInputChange} />
          </div>
          <div>
            <label>Department:</label>
            <input type="text" name="department" value={projectData.department} onChange={handleInputChange} />
          </div>
          <button type="submit">Create Project</button>
        </form>
      </div>
    </>
  );
};

export default ProjectForm;
