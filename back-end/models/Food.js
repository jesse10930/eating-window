const mongoose = require('mongoose');

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