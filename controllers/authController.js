// authController.js
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Registration schema
const registrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});

// Registration route
router.post('/register', async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;
  
      // Validate registration input using Joi
      const validation = registrationSchema.validate({
        username,
        email,
        password,
        confirmPassword,
      });
  
      if (validation.error) {
        return res.status(400).json({ message: validation.error.details[0].message });
      }
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Create a new user without hashing the password
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
  });
  

/// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  

  

module.exports = router;
