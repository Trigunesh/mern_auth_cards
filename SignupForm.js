import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    genre: '',
    experience: '',
    address: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',  // Added confirmPassword field
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for email and password
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password should be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Registration successful');
        navigate('/login');
      } else {
        toast.error(result.message || 'Error during registration');
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} required />
        <input type="number" name="experience" placeholder="Experience (years)" value={formData.experience} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
