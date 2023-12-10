require('dotenv').config();  // Make sure this line is at the top

const express = require('express');
const mongoose = require('mongoose');
const authController = require('./controllers/authController');
const cors = require('cors');
const corsOption = require("./cors/cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors(corsOption));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  tlsInsecure: true
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);

  // Check if the error is a ServerSelectionError
  if (error.name === 'MongoServerSelectionError') {
    console.error('MongoDB ServerSelectionError:', error.message);
    // Additional troubleshooting steps can be added here
  }

  // Exit the application or handle the error based on your needs
  process.exit(1);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  // Start the server after successful MongoDB connection
  startServer();
});

// Routes
app.use('/auth', authController);

// Start the server function
function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
