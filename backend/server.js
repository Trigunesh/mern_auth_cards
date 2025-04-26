const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/user');  // Ensure this file exists and is defined
const Card = require('./models/card');  // Ensure this file exists and is defined

const app = express();

// CORS configuration to allow frontend to communicate with backend
const corsOptions = {
  origin: 'http://localhost:3000',  // React frontend URL
  methods: 'GET, POST',
  allowedHeaders: 'Content-Type,Authorization', 
};
app.use(cors(corsOptions));

app.use(express.json());  // Middleware to parse JSON request bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern_auth_cards')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, location, genre, experience, address, email, phone, password, confirmPassword } = req.body;

  // Password validation
  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  try {
    // Check if email and phone are already taken
    const existingUser = await User.findOne({ email, phone });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User with this email and phone already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
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
    // Check if user exists by either email or phone
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if passwords match
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
    const cards = await Card.find().limit(10);  // Fetch only 10 cards
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
