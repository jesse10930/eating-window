const mongoose = require('mongoose');

const RemainingSchema = mongoose.Schema({
  startTime: {
    type: Date,
  },
  eatingWindow: {
    type: Number,
  },
  calorieGoal: {
    type: Number
  }
});

module.exports = mongoose.model('remaining', RemainingSchema);