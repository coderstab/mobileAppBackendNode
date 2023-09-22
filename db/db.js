const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
