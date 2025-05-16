import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './signup.css';

const Signup = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [backendError, setBackendError] = useState(null);
  const navigate = useNavigate();

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
      .min(8, 'Password must be at least 8 characters'),
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
    onSubmit: async (values, { setSubmitting }) => {
      setBackendError(null);
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
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Signup failed');
        }

        setShowSuccessPopup(true);
        setTimeout(() => {
          navigate('/login');
        }, 1000);

      } catch (error) {
        console.error('Signup error:', error);
        setBackendError(error.message);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Error message with red styling */}
        {backendError && (
          <div className="error-message" style={{
            color: 'red',
            backgroundColor: '#ffebee',
            border: '1px solid #ef9a9a',
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {backendError}
          </div>
        )}

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
          {formik.touched.name && formik.errors.name && (
            <div className="field-error">{formik.errors.name}</div>
          )}
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
          {formik.touched.email && formik.errors.email && (
            <div className="field-error">{formik.errors.email}</div>
          )}
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
          {formik.touched.password && formik.errors.password && (
            <div className="field-error">{formik.errors.password}</div>
          )}
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
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="field-error">{formik.errors.confirmPassword}</div>
          )}
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

      {showSuccessPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <h3>Signup Successful!</h3>
            <p>Redirecting to login page...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;