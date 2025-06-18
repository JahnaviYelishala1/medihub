// src/components/Register.js
import React, { useState } from "react";
import axios from "../utils/axios"; 
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    city: "",
    country: "",
    gender: "",
    dob: "",
    role: "Patient",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://courageous-patience-production.up.railway.app/api/auth/register", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err); // 👈 Add this for debugging
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Register as {form.role}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              className="form-control"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          name="dob"
          placeholder="Date of Birth"
          type="date"
          value={form.dob}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          required
        />
        <select
          className="form-select mb-3"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>
        <select
          className="form-select mb-3"
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
        </select>
        <button className="btn btn-primary w-100" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
