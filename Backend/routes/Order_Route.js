const express = require('express');
const router = express.Router();
const { getOrders } = require('../controllers/Order_controller');
const  requireAuth  = require('../middleware/authMiddleware');
router.get('/',requireAuth, getOrders);

module.exports = router;