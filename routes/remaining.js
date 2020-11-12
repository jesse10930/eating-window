const express = require('express');
const router = express.Router();

const Remaining = require('../models/Remaining');

// @route   POST api/remaining
// @desc    Add start time, eating window, and calories
// @access  Public
router.post('/', async (req, res) => {
  // declare input from user
  const eatingWindow = req.body.eatingWindow;
  const calorieGoal = req.body.calorieGoal;
  const startTime = req.body.startTime;

  try {
    // declare new remaining schema entry
    const newRemaining = new Remaining({
      startTime,
      eatingWindow,
      calorieGoal
    });

    // save to database
    const remaining = await newRemaining.save();

    res.json(remaining);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/remaining
// @desc    Retrieve start time, eating window, and calories
// @access  Public
router.get('/', async (req, res) => {
  try {
    // declare object containing data from remaining db
    const data = await Remaining.find();

    res.json(data);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @route   DELETE api/remaining
// @desc    Delete start time, eating window, and calories
// @access  Public
router.delete('/', async (req, res) => {
  try {
    // find and delete remaining db entries
    await Remaining.deleteMany({ });

    res.json( {msg: 'Remaining Cleared'});

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;