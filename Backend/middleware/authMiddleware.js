const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        console.log('Token verification failed');
       // res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    //res.redirect('/login');
    console.log('No token, authorization denied');
  }
};

module.exports = { requireAuth };