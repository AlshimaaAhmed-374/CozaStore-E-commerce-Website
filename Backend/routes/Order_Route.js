const express = require('express');
const router = express.Router();
const { checkout } = require('../controllers/Order_controller');

router.post('/checkout', checkout);

module.exports = router;