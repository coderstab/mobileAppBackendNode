require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests

// Require route files
const authRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const sendOtp = require('./routes/otpSend');
const verifyOtp = require('./routes/verifyOtp');
const demoData = require('./routes/deoW3');



// Use the route files as middleware
app.use('/auth', authRoutes); 
app.use('/auth', loginRoutes); 
app.use('/auth', sendOtp); 
app.use('/auth',verifyOtp);
app.use('/auth',demoData);
  
  
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });