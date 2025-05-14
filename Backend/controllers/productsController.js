
const Product = require('../models/products.model')


const GetProductsHome =async(req,res)=>{
	try{
		const {type} = req.query
        
		const filter = {}
		if(type){
		 filter.type = String(type);
		}

		 const products = await Product.find(filter)
		 res.status(200).json({success:true , data: products })
	}catch(error){
		console.log("Error fetching products:", error.message)
		res.status(500).json({success:false,message:"Server Error"})
	}

}
const GetProductsShop = async(req,res)=>{
    try{
		const { cat } = req.query
        
		const filterS = {}
		if(cat){
		 filterS.cat = String(cat);
		}

		 const products = await Product.find(filterS)
		 res.status(200).json({success:true , data: products })
	}catch(error){
		console.log("Error fetching products:", error.message)
		res.status(500).json({success:false,message:"Server Error"})
	}
}

const GetAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error fetching all products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
const getProductDetails = async (req, res) => {
	try {
	  const { id } = req.params; // Get product ID from URL params
  
	  // Find product by ID
	  const product = await Product.findOne({ id: Number(id) });
  
	  if (!product) {
		return res.status(404).json({ 
		  success: false, 
		  message: 'Product not found' 
		});
	  }
  
	  res.status(200).json({ 
		success: true, 
		data: product 
	  });
  
	} catch (error) {
	  console.error("Error fetching product details:", error.message);
	  res.status(500).json({ 
		success: false, 
		message: "Server Error" 
	  });
	}
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports= {GetProductsH: GetProductsHome, GetProductsS:GetProductsShop , GetAllProducts: GetAllProducts ,getProductDetails}