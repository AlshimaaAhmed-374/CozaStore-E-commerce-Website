import React from 'react';
import './contact.css';
const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-form">
          <h2>Contact Us</h2>
          <p className="contact-description">
            Feel free to contact us any time. We will get back to you as soon as we can!
          </p>
          
          <form className="form-container">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your name" />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your email" />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Your message" rows="5"></textarea>
            </div>
            
            <button type="submit" className="send-button">SEND</button>
          </form>
        </div>
        
        <div className="contact-info">
          <h3>Info</h3>
          <ul className="info-list">
            <li>
              <i className="icon">✉</i>
              <span>CozaStore@gmail.com</span>
            </li>
            <li>
              <i className="icon">📞</i>
              <span>+24 56 89 146</span>
            </li>
            <li>
              <i className="icon">📍</i>
              <span>14 USA</span>
            </li>
            <li>
              <i className="icon">🕒</i>
              <span>09:00 - 18:00</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;