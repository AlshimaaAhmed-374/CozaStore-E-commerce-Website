import './LoginSignup.css';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import user_icon from '../Assets/person.png';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginSignup = ({ onLogin }) => {
  const [action, setAction] = useState('Sign Up');

  useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  const signUpValidationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be 20 characters or less')
      .required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const loginValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    validationSchema: action === 'Sign Up' ? signUpValidationSchema : loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const endpoint = action === 'Sign Up' ? 'signup' : 'login';
        const url = `http://localhost:5000/${endpoint}`;

        const payload = action === 'Sign Up'
          ? values
          : {
              email: values.email,
              password: values.password
            };

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `${action} failed`);
        }

        console.log(`${action} success:`, data);

        if (action === 'Login') {
          if (onLogin && data.user) {
            onLogin(data.user);  // Navigate to Home
          } else {
            console.log('Logged in but no user returned.');
          }
        } else {
          // After successful Sign Up, switch to Login screen
          alert('Sign up successful! Please log in.');
          setAction('Login');
        }

        formik.resetForm();
      } catch (error) {
        console.error(`${action} error:`, error.message);
        alert(error.message);
      }
    }
  });

  const handleActionChange = (newAction) => {
    setAction(newAction);
    formik.resetForm();
  };

  return (
    <div className='login'>
      <div className="containerLogin">
        <div className="headerLogin">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="inputs-container">
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

          <button type="submit" className="submit-action">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
