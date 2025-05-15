// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { checkoutCart } = require('../controllers/Cart_controller');
const requireAuth = require("../middleware/authMiddleware");

router.post('/checkout', requireAuth, checkoutCart);

module.exports = router;