const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Food = require('../models/Food');

// @route   POST api/foods
// @desc    Add food item to food list
// @access  Public
router.post(
  '/',
  // check item, quantity, and calories are not empty
  [
    check('item', 'please add item')
      .not()
      .isEmpty(),
    check('quantity', 'please add quantity')
      .not()
      .isEmpty(),
    check('calories', 'please add calories')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // if check array not empty, return error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // declare user input
    const item = req.body.item;
    const quantity = req.body.quantity;
    const calories = Number(req.body.calories);

    try {
      // declare new food schema entry
      const newFood = new Food({
        item,
        quantity,
        calories
      });

      // save to food db
      const food = await newFood.save();

      res.json(food);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/foods
// @desc    Retrieve all content from db
// @access  Public
router.get('/', async (req, res) => {
  try {
    // find all food entries from db and delcare
    const data = await Food.find();

    res.json(data);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/foods
// @desc    Remove all content from db
// @access  Public

router.delete('/', async (req, res) => {
  try {
    // delete all entries from food db
    await Food.deleteMany({ });

    res.json( {msg: 'Foods Cleared'} );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;