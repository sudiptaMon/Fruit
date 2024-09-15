import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useAuth } from '../context/AuthContext';
import '../styles/loginform.css';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleTabClick = (tab) => {
    setIsLogin(tab === 'login');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email) => {
    // Simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setEmailError('');

    // Dummy credentials for validation
    const dummyUser = 'dummyuser@gmail.com';
    const dummyPassword = 'password';

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (email === dummyUser && password === dummyPassword) {
      login(); // Update authentication state
      navigate('/home');
    } else {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="form-tabs">
          <Link
            to="/login" // Dummy link for Login tab
            className={isLogin ? 'active-tab' : ''}
            onClick={() => handleTabClick('login')}
          >
            Login
          </Link>
          <Link
            to="/register" // Dummy link for Register tab
            className={!isLogin ? 'active-tab' : 'inactive-tab'}
            onClick={() => handleTabClick('register')}
          >
            Register
          </Link>
        </div>

        {isLogin ? (
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <p>
              By signing in you are agreeing to our <Link to="/terms">Terms and Privacy Policy</Link>
            </p>

            <p className="note">
              <strong>Note:</strong> To access the login functionality, use the following dummy credentials:<br />
              <strong>Email:</strong> dummyuser@gmail.com<br />
              <strong>Password:</strong> password
            </p>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {emailError && <p className="error-message">{emailError}</p>}

            <div className="input-group">
              <input
                type="email"
                placeholder="&#xf0e0; Email Address"
                className='input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="&#xf023; Password"
                className='input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`fa ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} show-password-icon`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>

            <div className="remember-forgot">
              <label className="remember-password">
                <input type="checkbox" className='chbox'/> <span>Remember password</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>
        ) : (
          <div className="register-message">
            <h2>Service is not available yet</h2>
            <p>Check back later or <Link to="/register">register</Link> when it's ready.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
