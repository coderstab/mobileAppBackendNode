// Load environment variables from .env
require('dotenv').config();

// middleware/authorize.js

function authorize(req, res, next) {
    const { authorization } = req.headers;
    const secretKey = process.env.API_SECRET_KEY;
  
    if (!authorization || authorization !== `Bearer ${secretKey}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    next();
  }
  
  module.exports = authorize;
  