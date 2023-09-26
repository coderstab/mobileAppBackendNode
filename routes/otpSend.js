const express = require('express');
const router = express.Router();
const supabase = require('../db/db'); // Adjust the path as needed
const authorize = require('../middleware/authorize');
const axios = require('axios'); // Import axios
require('dotenv').config();

router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  const smsApi = process.env.FATS2SMS;

  // Generate a random 6-digit OTP
  const otp = String(Math.floor(1000 + Math.random() * 9000));

  // Store the OTP in Supabase
  const { data, error } = await supabase
    .from('otp')
    .upsert(
      [
        {
          phone_number: phoneNumber,
          otp: otp,
        },
      ],
      { onConflict: ['phone_number'], updateAll: ['otp'] }
    );

  if (error) {
    return res.status(500).json({ error: 'Failed to send OTP' });
  }

  // Send the OTP via Fast2SMS
  const fast2smsEndpoint = 'https://www.fast2sms.com/dev/bulkV2';

  try {
    const response = await axios.post(
      fast2smsEndpoint,
      {
        variables_values: otp,
        route: 'otp',
        numbers: phoneNumber,
      },
      {
        headers: {
          Authorization: smsApi, // Replace with your Fast2SMS API key
        },
      }
    );

    // Check if Fast2SMS request was successful
    if (response.status === 200) {
      // For testing purposes, we'll just return the OTP in the response
      return res.json({ message: 'OTP has been sent successfully.' });
    } else {
      return res.status(500).json({ error: 'Failed to send OTP' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send OTP' });
  }
});

module.exports = router;
