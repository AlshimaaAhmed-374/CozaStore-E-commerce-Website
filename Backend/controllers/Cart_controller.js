// controllers/cartController.js
const Product = require('../models/products.model');
const Order = require('../models/orders.model');
const User = require('../models/users.model'); // Optional: if you want to validate user

const checkoutCart = async (req, res) => {
  try {
    const userId = req.user?._id;

    // Validate user
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    // Optional: Check if user exists in DB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const { cartItems } = req.body;

    // Validate input
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart items are required.' });
    }

    let total = 0;
    const orderProducts = [];

    for (const item of cartItems) {
      const product = await Product.findById(item._id ); // handles both cases
      if (!product) {
        return res.status(404).json({ 
          message: `Product not found with ID: ${item._id || item.id}`,
          receivedItem: item // helpful for debugging
        });
      }
      
      // if (!product) {
      //   return res.status(404).json({ message: `Product not found with ID: ${item.id}` });
      // }

      const subtotal = product.price * item.qty;
      total += subtotal;

      orderProducts.push({
        product: product._id,
        quantity: item.qty,
        purchasedAtPrice: product.price,
      });
    }

    // Add shipping cost
    const shippingCost = 30;
    total += shippingCost;

    const newOrder = new Order({
      user: userId,
      products: orderProducts,
      totalAmount: total,
      status: 'pending',
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Checkout failed', error: error.message });
  }
};

module.exports = { checkoutCart };
