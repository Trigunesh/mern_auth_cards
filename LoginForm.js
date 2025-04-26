import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });

  const navigate = useNavigate();  // Hook to navigate programmatically

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Login successful');
        
        // Redirect to the homepage upon successful login
        navigate('/home');  // You can replace '/home' with your actual homepage route
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email or Phone"
          value={formData.emailOrPhone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
