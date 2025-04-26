import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardList = ({ cards }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Redirect to homepage
  const redirectToHome = () => {
    navigate('/home');  // Change '/home' to your actual homepage route
  };

  return (
    <div>
      <h2>Card List</h2>
      <div>
        {cards && cards.length > 0 ? (
          cards.map((card, index) => (
            <div key={index} className="card">
              <h3>{card.name}</h3>
              <p>{card.genre}</p>
              <p>{card.place}</p>
              <img src={card.photo} alt={card.name} />
            </div>
          ))
        ) : (
          <p>No cards available.</p>
        )}
      </div>

      {/* Button to redirect to homepage */}
      <button onClick={redirectToHome}>Go to Homepage</button>
    </div>
  );
};

export default CardList;