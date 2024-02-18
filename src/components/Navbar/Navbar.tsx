import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar: React.FC = () => {
  const [name, setName] = useState<string>('')
  useEffect(() => {
    const storedUsername = localStorage.getItem('name')
    if (storedUsername) {
      setName(storedUsername)
    }
  },[])
  return (
    <div className='navbar'>
      <div className='left-links'>
        <Link to="/attendance">Attendance</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/create-employee">Create Employee</Link>
      </div>
      <div className='right-greeting'>
        Hello, {name}
      </div>
    </div>
  )
}

export default Navbar
