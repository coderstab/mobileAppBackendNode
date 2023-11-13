const express = require('express');
const router = express.Router();
const supabase = require('../db/db'); // Adjust the path as needed
// const authorize = require('../middleware/authorize');
// const unirest = require('unirest');

router.post('/demoData', async (req, res) => {
  
  try {
    const response = await axios.get('https://medicallogowear.com/wp-json/wc/v3/products/categories?per_page=100', {
        headers: { 
            'sec-ch-ua': '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"', 
            'Accept': 'application/json, text/plain, */*', 
            'Referer': 'https://hoytcompany.vercel.app/', 
            'sec-ch-ua-mobile': '?1', 
            'Authorization': 'Basic Y2tfODQyNWE3Mjk1ODJhNGIwZTY4MzBkZmEzNTgxMzAxZWMyZWUwMmYzMTpjc19mNDQxMmU4YzY2OGEwODE2NjUyMmFlOWQyZDVhMDM0Y2RiNWVhNTc1', 
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36', 
            'sec-ch-ua-platform': '"Android"', 
            'Cookie': 'br_lgv_stat=default%7Cdefault; woocommerce_cart_hash=339ea05aff509b43a422d15aabdf54c4; woocommerce_items_in_cart=1; wp_woocommerce_session_aa74d1a4a193a4cc33bc4a9c1a783fd7=5661%7C%7C1700054121%7C%7C1700050521%7C%7C07178d9f81189eda71a87130f857e958'
          }
    });
    res.json(response.data);
} catch (error) {
    res.status(500).send('Error fetching data');
}

  
 
    
  });

  module.exports = router;