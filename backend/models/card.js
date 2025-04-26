const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  place: { type: String, required: true },
  genre: { type: String, required: true },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
