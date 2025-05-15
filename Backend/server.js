const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth_route');
const CookieParser = require('cookie-parser');
const connectDB = require('./config/db.js');
const cors = require('cors');
const orderRoutes = require('./routes/Order_Route');
const cartRoutes = require('./routes/Cart_Route');
const feedbackRoutes = require('./routes/Feedback_Route');
//const { requireAuth } = require('./middleware/authMiddleware');
const profileRoutes = require('./routes/Profile_Route');

dotenv.config();
const homeRoutes = require("./routes/home.routes.js");
const shopRoutes = require("./routes/shop.routes.js");
const wishlistRoutes = require("./routes/wishList.routes.js");

const app = express();
app.use(CookieParser());
// Middleware
app.use(express.json());
app.use(CookieParser());
app.use(express.urlencoded({ extended: true }));
// Configure CORS to allow specific origin and credentials
app.use(cors({
  origin: 'http://localhost:3000', // Your React app
  credentials: true,               // Allow cookies
}));



const PORT = process.env.PORT || 5000


// Middlewares
app.use(express.json()); // allows us to accept JSON data in the req.body

// Routes
app.use('/api/users', profileRoutes ); // Protect profile routes with authentication middleware
app.use('/api/feedback', feedbackRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use(authRoutes);
app.use('/home', homeRoutes);
app.use('/shop', shopRoutes);
app.use('/wishlist', wishlistRoutes);

// Starting the server
app.listen(5000, () => {
    connectDB();  // Make sure you call the function to connect to MongoDB here
    console.log("Server started at http://localhost:" + 5000);
});

