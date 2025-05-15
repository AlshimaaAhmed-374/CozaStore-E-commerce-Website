import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './signup.css';

const Signup = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Full name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must not exceed 50 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      ,
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    // onSubmit: async (values) => {
    //   try {
    //     // Here you would typically make an API call to your backend
    //     console.log('Signup data:', values);
        
    //     // Simulate API call delay
    //     await new Promise(resolve => setTimeout(resolve, 1000));
        
    //     // Show success popup
    //     setShowSuccessPopup(true);
        
    //     // After 2 seconds, redirect to login
    //     setTimeout(() => {
    //       navigate('/login');
    //     }, 1000);
        
    //   } catch (error) {
    //     console.error('Signup error:', error);
    //     alert('Signup failed. Please try again.');
    //   }
    // }
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: values.name,
            email: values.email,
            password: values.password
          }),
          credentials: 'include' // ✅ Important if you're setting cookies from the backend
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Signup failed');
        }

        // Show success popup
        setShowSuccessPopup(true);

        // After a delay, redirect to login
        setTimeout(() => {
          navigate('/login');
        }, 1000);

      } catch (error) {
        console.error('Signup error:', error);
        alert(error.message || 'Signup failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    }

  });

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error-message">{formik.errors.name}</div>
          ) : null}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error-message">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        
        <button
          type="submit"
          className="signup-button"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      
      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <h3>Signup Successful!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;