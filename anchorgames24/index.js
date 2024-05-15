// Import modules
const express = require('express');
require('./mongoose');
const BoardGame = require('./boardGame');
const TradingCard = require('./tradingcard');
const VideoGame = require('./videoGame');

// Create an express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/', require('./app')); // Import routes from app.js

// Start the server
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
