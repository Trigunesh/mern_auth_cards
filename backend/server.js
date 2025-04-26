const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const Card = require('./models/card');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mern_auth_cards', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));;
// Signup Route

// server.js
app.post('/signup', async (req, res) => {
  const {
    name,
    location,
    genre,
    experience,
    address,
    email,
    phone,
    password,
    confirmPassword,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  try {
    // check if both email AND phone are already taken by the same user
    const existingUser = await User.findOne({ email, phone });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User with this email and phone already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      location,
      genre,
      experience,
      address,
      email,
      phone,
      password: hashedPassword,
    });

    res.json({ success: true, user });

  } catch (err) {
    console.error('Signup Error:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});




  
  // Login Route
  app.post('/login', async (req, res) => {
    const { emailOrPhone, password } = req.body;
  
    try {
      const user = await User.findOne({
        $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
  
      res.json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  // Get 10 Dummy Cards
  app.get('/cards', async (req, res) => {
    try {
      const cards = await Card.find().limit(10);
      res.json(cards);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  
 