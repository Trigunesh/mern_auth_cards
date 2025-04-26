import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const goToCardList = () => {
    navigate('/cards');
  };

  return (
    <div>
      <h1>Welcome to your homepage!</h1>
      <button onClick={goToCardList}>View Cards</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
