const Card = require('../models/card');

// Fetch 10 Dummy Cards
exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find().limit(10); // Fetch the first 10 cards
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cards' });
  }
};
