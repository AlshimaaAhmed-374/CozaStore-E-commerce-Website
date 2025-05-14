const Wishlist = require('../models/whishList.model');
const Product = require('../models/products.model')


const addToWishlist = async (req, res) => {
	try {
	  const { productId } = req.body;
	  const userId = req.user._id;
  
	  // Check if product exists
	  const product = await Product.findById(productId);
	  if (!product) {
		return res.status(404).json({ success: false, message: 'Product not found' });
	  }
  
	  // Find or create wishlist for user
	  let wishlist = await Wishlist.findOne({ user: userId });
  
	  if (!wishlist) {
		wishlist = new Wishlist({
		  user: userId,
		  products: [productId]
		});
		await wishlist.save();
		return res.status(201).json({ 
		  success: true, 
		  message: 'Product added to wishlist',
		  data: await wishlist.populate('products')
		});
	  }
  
	  // Check if product already exists in wishlist
	  if (wishlist.products.includes(productId)) {
		return res.status(400).json({ 
		  success: false, 
		  message: 'Product already in wishlist' 
		});
	  }
  
	  // Add product to wishlist
	  wishlist.products.push(productId);
	  wishlist.updatedAt = Date.now();
	  await wishlist.save();
  
	  res.status(200).json({ 
		success: true, 
		message: 'Product added to wishlist',
		data: await wishlist.populate('products')
	  });
  
	} catch (error) {
	  console.error("Error adding to wishlist:", error.message);
	  res.status(500).json({ success: false, message: "Server Error" });
	}
  };
  
  // Remove product from wishlist
  const removeFromWishlist = async (req, res) => {
	try {
	  const { productId } = req.body;
	  const userId = req.user._id;
  
	  const wishlist = await Wishlist.findOne({ user: userId });
  
	  if (!wishlist) {
		return res.status(404).json({ 
		  success: false, 
		  message: 'Wishlist not found' 
		});
	  }
  
	  // Check if product exists in wishlist
	  const productIndex = wishlist.products.indexOf(productId);
	  if (productIndex === -1) {
		return res.status(404).json({ 
		  success: false, 
		  message: 'Product not found in wishlist' 
		});
	  }
  
	  // Remove product from array
	  wishlist.products.splice(productIndex, 1);
	  wishlist.updatedAt = Date.now();
	  await wishlist.save();
  
	  res.status(200).json({ 
		success: true, 
		message: 'Product removed from wishlist',
		data: await wishlist.populate('products')
	  });
  
	} catch (error) {
	  console.error("Error removing from wishlist:", error.message);
	  res.status(500).json({ success: false, message: "Server Error" });
	}
  };
  
  // Get user's wishlist with full product details
  const getWishlist = async (req, res) => {
	try {
	  const userId = req.user._id;
  
	  const wishlist = await Wishlist.findOne({ user: userId })
		.populate({
		  path: 'products',
		  model: 'Product'
		})
		.lean();
  
	  if (!wishlist) {
		// Return empty array if no wishlist exists
		return res.status(200).json({ 
		  success: true, 
		  data: { products: [] } 
		});
	  }
  
	  res.status(200).json({ 
		success: true, 
		data: wishlist 
	  });
  
	} catch (error) {
	  console.error("Error fetching wishlist:", error.message);
	  res.status(500).json({ success: false, message: "Server Error" });
	}
  };
  
  // Check if product is in wishlist
  const checkWishlist = async (req, res) => {
	try {
	  const { productId } = req.params;
	  const userId = req.user._id;
  
	  const wishlist = await Wishlist.findOne({ 
		user: userId,
		products: productId
	  });
  
	  res.status(200).json({ 
		success: true, 
		data: { isInWishlist: !!wishlist } 
	  });
  
	} catch (error) {
	  console.error("Error checking wishlist:", error.message);
	  res.status(500).json({ success: false, message: "Server Error" });
	}
  };
  module.exports= { addToWishlist,removeFromWishlist,getWishlist,checkWishlist}