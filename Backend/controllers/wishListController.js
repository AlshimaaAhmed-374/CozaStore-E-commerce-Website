const Wishlist = require('../models/whishList.model'); 


const addToWishlist = async (req, res) => {
	try {
	  const { productId } = req.body;
	  const userId = req.user._id; 
  
	  let wishlist = await Wishlist.findOne({ user: userId });
  
	  if (!wishlist) {
		wishlist = new Wishlist({
		  user: userId,
		  products: [productId],
		});
	  } else if (!wishlist.products.includes(productId)) {
		wishlist.products.push(productId);
	  }
  
	  await wishlist.save();

	  const updated = await Wishlist.findById(wishlist._id).populate('products');
	  res.status(200).json({ 
		success: true,
		data: {
		  products: updated.products
		}
	  });
	} catch (err) {
	  console.error('Error:', err);
	  res.status(500).json({ 
		success: false,
		message: err.message 
	  });
	}
  };

  
  const removeFromWishlist = async (req, res) => {
	try {
	  const productId = req.query.productId;
	  const userId = req.user._id;
  
	  const updatedWishlist = await Wishlist.findOneAndUpdate(
		{ user: userId },
		{ $pull: { products: productId } },
		{ new: true }
	  ).populate('products');
  
	  if (!updatedWishlist) {
		return res.status(404).json({ 
		  success: false,
		  message: "Wishlist not found for user" 
		});
	  }
  
	  if (updatedWishlist.products.length === 0) {
		await Wishlist.deleteOne({ _id: updatedWishlist._id });
		return res.status(200).json({
		  success: true,
		  message: 'Last product removed and wishlist deleted',
		  data: { products: [] }
		});
	  }
  	  return res.status(200).json({
		success: true,
		message: 'Product removed from wishlist',
		data: { products: updatedWishlist.products }
	  });
  
	} catch (error) {
	  console.error('Error removing from wishlist:', error);
	  return res.status(500).json({ 
		success: false,
		message: 'Failed to remove from wishlist',
		error: error.message
	  });
	}
  };
  
  
  

const getWishlist = async (req, res) => {
	try {	  
	  const userId = req.user.id;  

	  let wishlist = await Wishlist.findOne({ user: userId }).populate('products'); // Populate products if needed
  
	  if (!wishlist) {
	
		wishlist = new Wishlist({ user: userId, products: [] });
		await wishlist.save();
	  }
	  return res.status(200).json({ message: 'Wishlist fetched successfully', data: wishlist });
  
	} catch (error) {
	  res.status(500).json({ message: 'Failed to fetch wishlist' });
	}
  };
  


module.exports = { addToWishlist, removeFromWishlist, getWishlist };
