import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeFormPage.css';

const EmployeeForm: React.FC = () => {
  const [employeeData, setEmployeeData] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    department: '',
    age: '',
    salary: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployeeData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        throw new Error('Admin token not found');
      }

      const response = await axios.post('http://localhost:5000/employees', employeeData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        }
      });

      alert('Employee created successfully');
      // Reset form after submission
      setEmployeeData({
        fName: '',
        lName: '',
        email: '',
        password: '',
        department: '',
        age: '',
        salary: 0,
      });
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('Error creating employee');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-group">
          <label>First Name:</label>
          <input type="text" name="fName" value={employeeData.fName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input type="text" name="lName" value={employeeData.lName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={employeeData.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={employeeData.password} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <select name="department" value={employeeData.department} onChange={handleInputChange}>
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="text" name="age" value={employeeData.age} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Salary:</label>
          <input type="number" name="salary" value={employeeData.salary} onChange={handleInputChange} />
        </div>
        <button type="submit" className="submit-btn">Create Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
