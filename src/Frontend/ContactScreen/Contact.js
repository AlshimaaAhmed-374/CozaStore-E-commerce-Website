import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          review: formData.message
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit feedback');
      }

      setSubmitStatus({ success: true, message: data.message });
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      setSubmitStatus({ success: false, message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-form">
          <h2>Contact Us</h2>
          <p className="contact-description">
            Feel free to contact us any time. We will get back to you as soon as we can!
          </p>
          
          {submitStatus && (
            <div className={`submit-message ${submitStatus.success ? 'success' : 'error'}`}>
              {submitStatus.message}
            </div>
          )}
          
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Your name" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Your email" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                placeholder="Your message" 
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="send-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'SENDING...' : 'SEND'}
            </button>
          </form>
        </div>
        
        {/* Rest of your contact info remains the same */}
      </div>
    </div>
  );
};

export default Contact;