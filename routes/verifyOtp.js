const express = require('express');
const router = express.Router();
const supabase = require('../db/db'); // Adjust the path as needed
// const authorize = require('../middleware/authorize');
// const unirest = require('unirest');

router.post('/verify-otp', async (req, res) => {
    const { phoneNumber, otp } = req.body;
  
    // Retrieve the OTP from Supabase
    const { data: otpData, error } = await supabase
      .from('otp')
      .select('*')
      .eq('phone_number', phoneNumber)
     
  
    if (error) {
      return res.status(500).json({error: 'Failed to verify OTP' });

    }
    const otpNum = otpData[0] && otpData[0].otp;

    if (otpNum  != otp) {
      return res.status(400).json({ error: 'OTP is incorrect' });
      
    }
  
    // OTP is correct; you can proceed with further actions
    res.status(200).json({ message: 'OTP is correct' });
    
  });

  module.exports = router;