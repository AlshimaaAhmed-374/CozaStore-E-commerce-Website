// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { checkoutCart } = require('../controllers/Cart_controller');

router.post('/checkout', checkoutCart);

module.exports = router;