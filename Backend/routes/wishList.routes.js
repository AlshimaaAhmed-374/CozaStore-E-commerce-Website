const express = require('express');
const  requireAuth = require('../middleware/authMiddleware.js');

const router = express.Router();
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishListController.js');

router.post('/add',requireAuth,addToWishlist);
router.delete('/remove', requireAuth, removeFromWishlist);
router.get('/', requireAuth,getWishlist);

module.exports = router;