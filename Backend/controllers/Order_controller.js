const Order = require('../models/orders.model');

const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("user id :  ", userId);
    // Fetch all orders by the user and populate product and user details
    const orders = await Order.find({ user: userId })
      .populate('products.product');  // populate each product in the order
       console.log("orders:  ", orders);

    return res.status(200).json({
      message: 'Orders fetched successfully',
      data: orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

module.exports = { getOrders };
