const express = require('express');
const router = express.Router();
const supabase = require('../db/db'); // Adjust the path as needed
const authorize = require('../middleware/authorize');
const unirest = require('unirest');
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

  const request = unirest.post(fast2smsEndpoint);

  // Set Fast2SMS headers and form data
  request.headers({
    'authorization': `${smsApi}`, // Replace with your Fast2SMS API key
  });

  request.form({
    'variables_values': `${otp}`,
    'route': 'otp',
    'numbers': phoneNumber,
  });

  // Send the request to Fast2SMS
  request.end(function (response) {
    if (response.error) {
      console.error(response.error);
      return res.status(500).json({ error: 'Failed to send OTP ' });
    }

    // For testing purposes, we'll just return the OTP in the response
    res.json({ message: 'OTP has sent successfully.' });
  });
});


module.exports = router;
