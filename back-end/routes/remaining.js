const express = require('express');
const router = express.Router();

const Remaining = require('../models/Remaining');

// @route   POST api/remaining
// @desc    Add start time and eating window
// @access  Public
router.post('/', async (req, res) => {
  const eatingWindow = req.body.eatingWindow;
  const calorieGoal = req.body.calorieGoal;
  const startTime = req.body.startTime;

  try {
    const newRemaining = new Remaining({
      startTime,
      eatingWindow,
      calorieGoal
    });

    const remaining = await newRemaining.save();

    res.json(remaining);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/remaining
// @desc    Retrieve start time and eating window
// @access  Public
router.get('/', async (req, res) => {
  try {
    const data = await Remaining.find();

    res.json(data);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route   DELETE api/remaining
// @desc    Delete start time and eating window
// @access  Public
router.delete('/', async (req, res) => {
  try {
    await Remaining.deleteMany({ });

    res.json( {msg: 'Remaining Cleared'});

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;