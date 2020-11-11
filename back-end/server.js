const express = require('express');
const connectDB = require('./config/db')
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());

// Connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }))

// Define Routes
app.use('/api/foods', require('./routes/foods'));
app.use('/api/remaining', require('./routes/remaining'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));