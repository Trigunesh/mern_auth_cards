// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  location: String,
  genre: String,
  experience: Number,
  address: String,
  email: String, // removed: unique: true
  phone: String, // removed: unique: true
  password: String,
});


module.exports = mongoose.model('User', userSchema);
