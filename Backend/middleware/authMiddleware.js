const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/users.model'); // Make sure the path is correct

dotenv.config();

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
 // console.log('Cookies:', req.cookies);

  //console.log('Token123:', token);

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        console.log('Token verification failed');
        return res.status(401).json({ error: 'Unauthorized' });
      } else {
        try {
          //console.log('Decoded Token:', decodedToken);

          // Use decodedToken.id instead of _id
          const user = await User.findById(decodedToken.id);
          if (!user) {
            console.log('User not found');
            return res.status(401).json({ error: 'Unauthorized - user not found' });
          }

          req.user = user; // attach user to request
          next();
        } catch (dbErr) {
          console.error('Database error:', dbErr);
          return res.status(500).json({ error: 'Internal server error' });
        }
      }
    });
  } else {
    console.log('No token, authorization denied');
    return res.status(401).json({ error: 'No token, authorization denied' });
  }
};

module.exports = requireAuth ;


// const jwt = require("jsonwebtoken");
// const User = require("../models/users.model");
// const dotenv = require('dotenv');

// dotenv.config();

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     console.log("Token:", token);
//     if (!token) throw new Error("No token provided");

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded);
//     const user = await User.findById(decoded.id);
//     console.log("User from token:", user);

//     if (!user) throw new Error("User not found");

//     req.user = user; // Attach user to request
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Unauthorized" });
//   }
// };

// module.exports = auth;