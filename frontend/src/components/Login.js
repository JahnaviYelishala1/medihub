// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [role, setRole] = useState('Patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Helper to store user data in localStorage
  const storeUserData = (role, user, token) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userRole', role);

    if (role === 'Patient') {
      localStorage.setItem('patient', JSON.stringify(user));
    } else if (role === 'Doctor') {
      localStorage.setItem('doctor', JSON.stringify(user));
    } else if (role === 'Admin') {
      localStorage.setItem('admin', JSON.stringify(user));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://courageous-patience-production.up.railway.app/api/auth/login', {
        email,
        password,
        role,
      });

      const { user, token } = response.data;

      if (token && user) {
        storeUserData(role, user, token);
        alert(`${role} logged in successfully`);

        // Redirect based on role
        if (role === 'Patient') {
          navigate('/patient-dashboard');
        } else if (role === 'Doctor') {
          navigate('/doctor-dashboard');
        } else if (role === 'Admin') {
          navigate('/admin-dashboard');
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '450px', width: '100%' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Login As</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
          <p className="mt-3 text-center">
            Don't have an account?{' '}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => {
                if (role === 'Patient') {
                  navigate('/register');
                } else if (role === 'Doctor') {
                  navigate('/doctor-register');
                } else {
                  alert('Admins are not allowed to self-register.');
                }
              }}
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
