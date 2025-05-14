// controllers/cartController.js
const Product = require('../models/products.model');
const Order = require('../models/orders.model');

const checkoutCart = async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    let total = 0;
    const orderProducts = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.id);
      if (!product) {
        return res.status(404).json({ message: `Product not found with ID: ${item.id}` });
      }

      const subtotal = product.price * item.qty;
      total += subtotal;

      orderProducts.push({
        product: product._id,
        quantity: item.qty,
        purchasedAtPrice: product.price,
      });
    }

    const shippingCost = 30; // you can make this dynamic later
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