import React, { useState } from 'react';
import { post } from './ApiService';

function AddUserForm() {
  const [formData, setFormData] = useState({
    username: '',
    userType: '',
    email: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState({}); // State for error messages

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required.';
    }

    if (!formData.userType) {
      newErrors.userType = 'User type is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Phone number validation can be more complex depending on your needs
    const phoneRegex = /^\d+$/; // Simple numeric check
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Handle form submission
      
      try {
        const response = await post('/add_user', formData);
        console.log(response);
        
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className={errors.username ? 'error-input' : ''} // Add error styling
        />
        {errors.username && <span className="error-message">{errors.username}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="userType">User Type:</label>
        <input
          type="text"
          name="userType"
          id="userType"
          value={formData.userType}
          onChange={handleChange}
          className={errors.userType ? 'error-input' : ''}
        />
        {errors.userType && <span className="error-message">{errors.userType}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error-input' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel" // Use 'tel' for phone number input
          name="phoneNumber"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={errors.phoneNumber ? 'error-input' : ''}
        />
        {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
      </div>
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUserForm;
