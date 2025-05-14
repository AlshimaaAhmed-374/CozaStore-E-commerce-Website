const express = require('express')
const productsController = require('../controllers/productsController.js');
const router = express.Router();

router.get('/',productsController.GetProductsS)
router.get('/all',productsController.GetAllProducts)
router.get('/:id', productsController.getProductDetails);

module.exports = router;