const express = require('express');
const router = express.Router();
const supabase = require('../db/db'); // Adjust the path as needed
const authorize = require('../middleware/authorize');

// Define the registration route
router.post('/register',authorize, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email already exists in the database
    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('email', email);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (data && data.length > 0) {
      // Email is already registered
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // If the email is not registered, proceed with user registration
    const { user, registrationError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (registrationError) {
      console.error('Registration error:', registrationError);
      return res.status(400).json({ error: registrationError.message });
    }

    // User registered successfully
    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
