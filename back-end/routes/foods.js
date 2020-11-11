const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Food = require('../models/Food');

// @route   POST api/foods
// @desc    Add food item to food list
// @access  Public
router.post(
  '/',
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const item = req.body.item;
    const quantity = req.body.quantity;
    const calories = Number(req.body.calories);

    try {
      const newFood = new Food({
        item,
        quantity,
        calories
      });

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
    await Food.deleteMany({ });

    res.json( {msg: 'Foods Cleared'} );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;