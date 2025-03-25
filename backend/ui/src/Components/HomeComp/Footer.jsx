import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <a href="/">SabReserve</a>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
          <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
          <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} sabreserve. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
