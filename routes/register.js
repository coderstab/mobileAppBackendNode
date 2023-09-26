const express = require('express');
const router = express.Router();
const supabase = require('../db/db'); // Adjust the path as needed
const authorize = require('../middleware/authorize');

// Define the registration route
router.post('/register', authorize, async (req, res) => {
  try {
    const { email, password,name,phone_number } = req.body;

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

    // Insert user data into the 'user' table
    const userDataToInsert = {
      email,
      name,
      phone_number // Assuming you want to insert the email into the 'email' column
      // Add other user data fields here if needed
    };

    const { userInsertData, userInsertError } = await supabase
      .from('users')
      .upsert([userDataToInsert], { onConflict: ['email'] });

    if (userInsertError) {
      console.error('User data insert error:', userInsertError);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.status(201).json({ message: 'Registration successful' });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
