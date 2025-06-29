// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Login from './components/Login';
import Register from './components/Register';
import PatientDashboard from './components/PatientDashboard';
import DoctorResults from './components/DoctorResults';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorRegister from './components/DoctorRegister';
import DoctorAppointments from './components/DoctorAppointments';
import PatientAppointments from './components/PatientAppointments';
import MedicinesPage from './components/MedicinesPage';
import CartPage from './components/CartPage';
import AllDoctors from './components/AllDoctors';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import './components/Footer';

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctors" element={<DoctorResults />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        <Route path="/appointments" element={<PatientAppointments />} />
        <Route path="/medicines" element={<MedicinesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/doctors" element={<AllDoctors />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />


        {/* Add other routes here */}
      </Routes>
      <footer />
    </>
  );
}

export default App;
