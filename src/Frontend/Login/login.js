import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './login.css';

const Login = ({ onLogin }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        setError(null);

        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || "Login failed");
        }

        const data = await response.json();
        const userId = data.userId; // adjust if your backend returns something else

        onLogin(userId); // triggers session + App state
        navigate("/");
      } catch (err) {
        setError("Login failed: " + err.message);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={isSubmitting || !formik.isValid}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="signup-link">
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
