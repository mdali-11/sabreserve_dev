import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>SabReserve – Your Trusted Service Booking Platform</h1>
        <p>Find and book essential services seamlessly. From real estate to daily needs, we connect you with verified professionals in your area.</p>
      </section>

      <section className="about-content">
        <div className="about-highlight">
          <h2>Why Choose SabReserve?</h2>
          <p>SabReserve makes booking local services simple, fast, and reliable. Whether you need a property consultant, a travel guide, or an electrician, we bring the best service providers to your fingertips.</p>
        </div>

        <div className="services-list">
          <h2>Services We Offer</h2>
          <ul>
            <li>🏡 <strong>Real Estate:</strong> Buy, sell, or rent properties hassle-free.</li>
            <li>🏠 <strong>Residential Services:</strong> Home repairs, cleaning, and maintenance.</li>
            <li>✈️ <strong>Travel & Tourism:</strong> Plan vacations, book hotels, and get guided tours.</li>
            <li>💆 <strong>Spa & Wellness:</strong> Relax and rejuvenate with professional spa services.</li>
            <li>🔌 <strong>Electricians:</strong> Hire skilled electricians for quick repairs.</li>
            <li>🔧 <strong>More Local Services:</strong> From beauty to handyman work, find what you need.</li>
          </ul>
        </div>

        <div className="cta-section">
          <h2>Instantly Connect via WhatsApp</h2>
          <p>Get in touch with service providers instantly through WhatsApp and book your services effortlessly.</p>
          {/* <a href="https://wa.me/YOUR_WHATSAPP_NUMBER" className="cta-button" target="_blank" rel="noopener noreferrer">
            📲 Connect on WhatsApp
          </a> */}
        </div>
      </section>
    </div>
  );
};

export default About;
