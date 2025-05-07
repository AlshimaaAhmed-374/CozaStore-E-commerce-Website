//import './LoginSignup.css';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import user_icon from '../Assets/person.png';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginSignup = ({ onLogin }) => {
  const [action, setAction] = useState('Sign Up');

  const signUpValidationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be 20 characters or less')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  // Validation schema for Login
  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: action === 'Sign Up' ? signUpValidationSchema : loginValidationSchema,
    onSubmit: (values) => {
      // Trigger the onLogin function passed from App.js
      onLogin(); // This will change the state in App.js to `isLoggedIn: true`
    }
  });

  const handleActionChange = (newAction) => {
    setAction(newAction);
    formik.resetForm();
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="inputs-container">
          {/* Username Input - Only for Sign Up */}
          {action === 'Sign Up' && (
            <>
              <div className="input-field">
                <img src={user_icon} alt="User icon" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className={formik.touched.username && formik.errors.username ? 'error' : ''}
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <div className="error-message">{formik.errors.username}</div>
              )}
            </>
          )}

          {/* Email Input */}
          <div className="input-field">
            <img src={email_icon} alt="Email icon" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={formik.touched.email && formik.errors.email ? 'error' : ''}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}

          {/* Password Input */}
          <div className="input-field">
            <img src={password_icon} alt="Password icon" />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={formik.touched.password && formik.errors.password ? 'error' : ''}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}

          {/* Forgot Password - Only for Login */}
          {action === 'Login' && (
            <div className="forgot-password">
              Lost password? <span>Click here</span>
            </div>
          )}
        </div>

        <div className="submit-container">
          <button
            type="button"
            className={action === 'Sign Up' ? 'submit gray' : 'submit'}
            onClick={() => handleActionChange('Login')}
          >
            Login
          </button>
          <button
            type="button"
            className={action === 'Login' ? 'submit gray' : 'submit'}
            onClick={() => handleActionChange('Sign Up')}
          >
            Sign Up
          </button>
        </div>

        {/* Submit button is used to trigger the form submission */}
        <button type="submit" className="submit-action" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginSignup;
