const express = require('express');
const connectDB = require('./config/db')
const path = require('path');
const app = express();
const cors = require('cors');

// init cross platform capability
app.use(cors());

// Connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }))

// Define Routes
app.use('/api/foods', require('./routes/foods'));
app.use('/api/remaining', require('./routes/remaining'));

// Server static assets in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../build'));

  app.get('*', (req, res) => res.sendFile(path.resolve('../build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));