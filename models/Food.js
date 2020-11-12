const mongoose = require('mongoose');

// food schema for mongoDB with keys item, quantity, and calories
const FoodSchema = mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('food', FoodSchema);