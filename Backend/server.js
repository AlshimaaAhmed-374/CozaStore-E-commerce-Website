const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth_route');
const CookieParser = require('cookie-parser');
const connectDB = require('./config/db.js');
const cors = require('cors');
const { requireAuth } = require('./middleware/authMiddleware');

dotenv.config();

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

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:" + 5000);
});

// Check JWT_SECRET in .env
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is not defined! Make sure the .env file exists and is properly configured.");
} else {
  console.log("✅ JWT_SECRET loaded successfully:", process.env.JWT_SECRET);
};
