import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignupForm';
import Login from './components/LoginForm';
import HomePage from './components/HomePage';
import CardList from './components/CardList';
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes for Login and Signup */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Routes for Home and Cards */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/cards" element={<CardList />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
