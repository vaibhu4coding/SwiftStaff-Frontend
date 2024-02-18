import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import logo from './Logo.png';

interface Credentials {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', credentials);
      if (response.status === 200) {
        alert(`Login successful: Hi! ${response.data.employeeFName}`);
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('name',response.data.employeeFName)
        window.location.href = '/home';
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred');
      console.error(error);
    }
  };

  return (
    <div>
      <div className="logo-container">
      <img
        src={logo}
        alt="Logo"
        className="logoImg"
      /></div>
      <div className="login-container">
        <form>
          <h3>Login</h3>
          <div>
            Email:
            <input
              type="text"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            Password:
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
            ></input>
          </div>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
