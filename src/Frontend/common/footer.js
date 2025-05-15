import React from 'react';
import './footer.css'; // We'll create this CSS file next
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h1 className="footer-title">CozaStore</h1>
          <p className="footer-subtitle">Pick What You Want Fast & Easy</p>
          <div className="footer-divider"></div>
        </div>
        
        <div className="footer-sections">
          <div className="footer-section">
            <h3 className="section-title">Information</h3>
            <ul className="footer-links">
              <li>About Us</li>
              <li>More search</li>
              <li>Blog</li>
              <li>Events</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="section-title">Helpful Links</h3>
            <ul className="footer-links">
              <li>Services</li>
              <li>Supports</li>
              <li>Terms & Condition</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="section-title">Helpful Links</h3>
            <ul className="footer-links">
              <li><a href="/services">Services</a></li>
              <li><a href="/supports">Supports</a></li>
              <li><a href="/terms">Terms & Condition</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;