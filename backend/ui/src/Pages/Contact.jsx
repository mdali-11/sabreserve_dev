import React from 'react';
import './Contact.css';
import { FaEnvelope, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>
        We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to give feedback, feel free to reach out to us.
      </p>
      <div className="contact-info">
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <a href="mailto:sabreserve@gmail.com">sabreserve@gmail.com</a>
        </div>
        <div className="contact-item">
          <FaInstagram className="contact-icon" />
          <a href="https://instagram.com/sabreserve_" target="_blank" rel="noopener noreferrer">@sabreserve_</a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
