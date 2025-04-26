
const mongoose = require('mongoose'); 
const cardSchema = new mongoose.Schema({
  name: String,
  photo: String,
  place: String,
  genre: String,
});

module.exports = mongoose.model('Card', cardSchema);
