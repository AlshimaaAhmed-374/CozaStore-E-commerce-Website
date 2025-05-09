import React from 'react';
import './about.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      <div className="breadcrumb">
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <h1>About Us</h1>
        <h2>We Always Make <span>The Best</span></h2>
        <p>
          At CozaStore, we deliver top-quality products with seamless shopping.
          Our user-friendly platform offers secure checkout and excellent service,
          making every purchase effortless. We're committed to quality, convenience, and your complete satisfaction."
        </p>
         <Link to='/contact-page' className="link">Contact Us</Link>
      </div>

      {/* Skills Section */}
      <div className="skills-section">
        <h2>Our Skills</h2>
        <p>
          E-commerce specialists focused on quality products, smooth transactions, and happy customers.
        </p>
        
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">20+</div>
            <div className="stat-label">Years Of Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1,000+</div>
            <div className="stat-label">Project Done</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">300+</div>
            <div className="stat-label">Standing Client</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">64</div>
            <div className="stat-label">Certified Award</div>
          </div>
        </div>

        <div className="skill-bars">
          <div className="skill-item">
            <div className="skill-info">
              <span>Video Editing</span>
              <span>85%</span>
            </div>
            <div className="skill-bar">
              <div className="skill-progress" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="skill-item">
            <div className="skill-info">
              <span>Videography</span>
              <span>90%</span>
            </div>
            <div className="skill-bar">
              <div className="skill-progress" style={{ width: '90%' }}></div>
            </div>
          </div>
          <div className="skill-item">
            <div className="skill-info">
              <span>Photography</span>
              <span>77%</span>
            </div>
            <div className="skill-bar">
              <div className="skill-progress" style={{ width: '77%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>We Are Always Ready To Take A Perfect Shot</h2>
        <button className="cta-btn">Get Started</button>
      </div>
    </div>
  );
};

export default About;