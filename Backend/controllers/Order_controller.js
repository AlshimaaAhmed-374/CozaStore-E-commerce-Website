const Order = require('../models/orders.model');
const Product = require('../models/products.model');
const User = require('../models/users.model');

// Checkout API
const checkout = async (req, res) => {
  try {
    const { userId, products } = req.body;
    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ message: "User ID and cart items are required." });
    }

    // Find user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Calculate total amount and validate products
    let totalAmount = 0;
    const productItems = [];

    for (let i = 0; i < products.length; i++) {
      const { productId, quantity } = products[i];
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${productId} not found.` });
      }
      const purchasedAtPrice = product.price;
      totalAmount += purchasedAtPrice * quantity;
      productItems.push({
        product: product._id,
        quantity,
        purchasedAtPrice
      });
    }

    // Create the order
    const newOrder = new Order({
      user: user._id,
      products: productItems,
      totalAmount,
      status: 'pending'
    });

    await newOrder.save();

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error: error.message });
  }
};

module.exports = { checkout };