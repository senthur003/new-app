import React, { useState } from 'react';
import '../pages/login.css';
import { post } from './ApiService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [lang, setLang] = useState('en');
  const [type, setType] = useState('2');

  const validate = () => {
    let inputErrors = {};
    if (!email) {
      inputErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      inputErrors.email = 'Email address is invalid';
    }

    if (!password) {
      inputErrors.password = 'Password is required';
    } else if (password.length < 6) {
      inputErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(inputErrors);
    return Object.keys(inputErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      console.log('Email:', email);
      console.log('Password:', password);
      const data = { email, password,lang,type };

      try {
        const data = { email, password,lang,type };
        const response = await post('/login', data);
        console.log(response);
        const token = response.headers['access_token'];
        // Save token to localStorage
        localStorage.setItem('token', token);
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
