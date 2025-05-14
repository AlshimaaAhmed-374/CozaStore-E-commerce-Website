const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth_route');
const CookieParser = require('cookie-parser');
const connectDB = require('./config/db.js');
const cors = require('cors');
const { requireAuth } = require('./middleware/authMiddleware');


dotenv.config();
const homeRoutes = require("./routes/home.routes.js");
const shopRoutes = require("./routes/shop.routes.js");
const wishlistRoutes = require("./routes/wishList.routes.js");

const app = express();

// Middleware
app.use(express.json());
app.use(CookieParser());

// Configure CORS to allow specific origin and credentials
app.use(cors({
  origin: 'http://localhost:3000', // Your React app
  credentials: true,               // Allow cookies
}));

// Routes
app.use(authRoutes);
const PORT = process.env.PORT || 5000






// Middlewares
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use(cors());

// Routes
app.use('/home', homeRoutes);
app.use('/shop', shopRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Starting the server
app.listen(PORT, () => {
    connectDB();  // Make sure you call the function to connect to MongoDB here
    console.log("Server started at http://localhost:" + PORT);
});

// Check JWT_SECRET in .env
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is not defined! Make sure the .env file exists and is properly configured.");
} else {
  console.log("✅ JWT_SECRET loaded successfully:", process.env.JWT_SECRET);
};
