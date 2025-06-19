// ✅ New: Updated doctor registration and login support for frontend
// File: src/components/DoctorRegister.js

import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const DoctorRegister = () => {
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
    departmentName: "",
    departmentDescription: "",
    specializations: [],
    qualifications: [],
    experience: "",
    availableDays: [],
    availableHours: "",
    languagesKnown: [],
    appointmentCharges: "",
    role: "Doctor",
    docAvatar: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, docAvatar: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(',').map(s => s.trim());
    setForm({ ...form, [field]: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      if (["specializations", "qualifications", "availableDays", "languagesKnown"].includes(key)) {
        formData.append(key, JSON.stringify(form[key]));
      } else {
        formData.append(key, form[key]);
      }
    }

    try {
      await axios.post("https://courageous-patience-production.up.railway.app/api/doctors/register", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Doctor registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Doctor registration failed.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Doctor Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input name="firstName" className="form-control" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <input name="lastName" className="form-control" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          </div>
        </div>
        <input name="email" className="form-control mb-3" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
        <input name="phone" className="form-control mb-3" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="password" className="form-control mb-3" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
        <input name="country" className="form-control mb-3" placeholder="Country" value={form.country} onChange={handleChange} required />
        <input name="city" className="form-control mb-3" placeholder="City" value={form.city} onChange={handleChange} required />
        <select name="gender" className="form-select mb-3" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input name="departmentName" className="form-control mb-3" placeholder="Department Name" value={form.departmentName} onChange={handleChange} required />
        <textarea name="departmentDescription" className="form-control mb-3" placeholder="Department Description" value={form.departmentDescription} onChange={handleChange} required />
        <input name="specializations" className="form-control mb-3" placeholder="Specializations (comma-separated)" onChange={(e) => handleArrayChange(e, 'specializations')} required />
        <input name="qualifications" className="form-control mb-3" placeholder="Qualifications (comma-separated)" onChange={(e) => handleArrayChange(e, 'qualifications')} required />
        <input name="experience" className="form-control mb-3" placeholder="Experience" value={form.experience} onChange={handleChange} required />
        <input name="availableDays" className="form-control mb-3" placeholder="Available Days (comma-separated)" onChange={(e) => handleArrayChange(e, 'availableDays')} required />
        <input name="availableHours" className="form-control mb-3" placeholder="Available Hours" value={form.availableHours} onChange={handleChange} required />
        <input name="languagesKnown" className="form-control mb-3" placeholder="Languages Known (comma-separated)" onChange={(e) => handleArrayChange(e, 'languagesKnown')} required />
        <input name="appointmentCharges" className="form-control mb-3" placeholder="Appointment Charges" value={form.appointmentCharges} onChange={handleChange} required />
        <input name="docAvatar" type="file" className="form-control mb-3" accept="image/*" onChange={handleChange} required />
        <button className="btn btn-primary w-100" type="submit">Register</button>
      </form>
    </div>
  );
};

export default DoctorRegister;
