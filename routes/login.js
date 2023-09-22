const express = require('express');
const router = express.Router();
const supabase = require('../db/db'); // Adjust the path as needed
const authorize = require('./middleware/authorize');

router.post('/login', authorize,async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user,  error } =await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error('Login error:', error);
      return res.status(401).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
