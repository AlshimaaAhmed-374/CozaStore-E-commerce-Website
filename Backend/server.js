const dotenv = require('dotenv');
const express = require('express')
const connectDB   = require('./config/db.js')
const Product =require ("./models/products.model.js")
dotenv.config();

const app=express();
const PORT = process.env.PORT || 5000

app.use(express.json()) // allows us to accept JSON data in the req.body


app.get("/api/home",async(req,res)=>{
	try{
		const {type} = req.query
		const filter = {}
		if(type){
		 filter.type = {type: String(type) }
		}

		 const products = await Product.find(filter)
		 res.status(200).json({success:true , data: products })
	}catch(error){
		console.log("Error fetching products:", error.message)
		res.status(500).json({success:false,message:"Server Error"})
	}

})

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost: " + PORT);
});
