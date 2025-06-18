import React from "react";
import "./HeroSection.css";
import doctorsImg from "../assets/doctors.png";
import { Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer"; // ✅ import Footer

const HeroSection = () => {
  const navigate = useNavigate();

  const handleAppointmentClick = () => {
    navigate("/login");
  };

  const handleBuyMedicineClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="hero-wrapper">
        <div className="hero-content">
          <div className="text-content">
            <h1>
              Always caring about your <span>health</span>
            </h1>
            <p>
              MediHub is a platform where you can meet all doctors and buy essentials in one place.
            </p>
            <div className="buttons">
              <Button variant="dark" onClick={handleAppointmentClick}>
                🧑‍⚕️ Book Your Appointment Now
              </Button>
              <Button
                variant="outline-dark"
                className="ms-3"
                onClick={handleBuyMedicineClick}
              >
                💊 Buy Medicines and Essentials
              </Button>
            </div>
          </div>
          <div className="image-content">
            <img src={doctorsImg} alt="Doctors" />
            <Badge bg="success" className="bottom-right">
              ✅ 50+ Experienced Doctors
            </Badge>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HeroSection;
