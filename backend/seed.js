const mongoose = require('mongoose');
const Card = require('./models/card');

mongoose.connect('mongodb://localhost:27017/mern_auth_cards', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dummyCards = Array.from({ length: 10 }).map((_, i) => ({
  name: `Person ${i + 1}`,
  photo: `https://via.placeholder.com/150?text=Person+${i + 1}`,
  place: `City ${i + 1}`,
  genre: `Genre ${i + 1}`,
}));

Card.insertMany(dummyCards)
  .then(() => {
    console.log('Dummy cards inserted');
    mongoose.disconnect();
  })
  .catch((err) => console.error('Insert failed:', err));