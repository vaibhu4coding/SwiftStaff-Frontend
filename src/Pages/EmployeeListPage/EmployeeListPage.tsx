import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import './EmployeeListPage.css'
import Navbar from '../../components/Navbar/Navbar';
Chart.register(ArcElement);

const EmployeeAnalysis: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [minAgeFilter, setMinAgeFilter] = useState('');
  const [maxAgeFilter, setMaxAgeFilter] = useState('');
  const [minSalaryFilter, setMinSalaryFilter] = useState('');
  const [maxSalaryFilter, setMaxSalaryFilter] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const authToken = localStorage.getItem('adminToken');
      if (!authToken) return; // Handle case where authToken is null or undefined

      const response = await axios.get('http://localhost:5000/employees', {
        params: {
          department: departmentFilter,
          minAge: minAgeFilter,
          maxAge: maxAgeFilter,
          minSalary: minSalaryFilter,
          maxSalary: maxSalaryFilter,
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      // Check if response.data is an array before setting state
      if (Array.isArray(response.data)) {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const applyFilters = () => {
    fetchEmployees();
  };

  const generateChartData = () => {
    const departmentCountMap = filteredEmployees.reduce((acc, employee) => {
      acc[employee.department] = (acc[employee.department] || 0) + 1;
      return acc;
    }, {});
  
    const labels = Object.keys(departmentCountMap).map(department => `${department} (${departmentCountMap[department]})`);
    const data = Object.values(departmentCountMap);
  
    return {
      labels,
      datasets: [
        {
          label: 'Employee Distribution',
          data,
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#ff8a65', '#77dd77'], 
        },
      ],
    };
  };

  return (<>
      <Navbar></Navbar>
    <div className="employee-analysis-container">
      <div className="filter-options">
        <label>Department:</label>
        <input type="text" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} />

        <label>Min Age:</label>
        <input type="number" value={minAgeFilter} onChange={(e) => setMinAgeFilter(e.target.value)} />

        <label>Max Age:</label>
        <input type="number" value={maxAgeFilter} onChange={(e) => setMaxAgeFilter(e.target.value)} />

        <label>Min Salary:</label>
        <input type="number" value={minSalaryFilter} onChange={(e) => setMinSalaryFilter(e.target.value)} />

        <label>Max Salary:</label>
        <input type="number" value={maxSalaryFilter} onChange={(e) => setMaxSalaryFilter(e.target.value)} />

        <button onClick={applyFilters} className="apply-filters-btn">Apply Filters</button>
      </div>

      <div className="chart-container">
        <Pie data={generateChartData()} />
      </div>
      
    </div>
    <div className="table-container">
        <h3>Employee Results</h3>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Age</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.employeeId}</td>
                <td>{employee.fName}</td>
                <td>{employee.lName}</td>
                <td>{employee.department}</td>
                <td>{employee.email }</td>
                <td>{employee.age}</td>
                <td>{employee.salary}</td>
                {/* Add more table cells as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeAnalysis;
