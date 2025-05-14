const express = require('express');
const router = express.Router();
const { addToWishlist, removeFromWishlist, getWishlist,checkWishlist } = require('../controllers/wishListController.js');


router.post('/', addToWishlist);
router.delete('/', removeFromWishlist);
router.get('/', getWishlist);
router.get('/check/:productId', checkWishlist);

module.exports = router;