const mongoose = require('mongoose');

// remaining schema with keys startTime, eatingWindow, and calorieGoal
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