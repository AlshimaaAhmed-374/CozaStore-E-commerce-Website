const User = require("../models/users.model");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// 
// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};

module.exports.signup_post = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { maxAge: maxAge * 1000 });
    
    res.status(200).json({ 
      status: "success",
      data: user 
    });
  } 
  catch (err) {
    let errorMessage = "An error occurred during signup.";
    
    // Check for duplicate email or username (MongoDB error codes)
    if (err.code === 11000) {
      if (err.keyPattern.email) {
        errorMessage = "Email already exists.";
        console.log("Email already exists.");
      } 
      else if (err.keyPattern.username) {
        errorMessage = "Username already taken.";
        console.log("Username already taken.");
      }
    }
    // Validation errors (e.g., missing fields)
    else if (err.name === "ValidationError") {
      errorMessage = Object.values(err.errors).map(e => e.message).join(", ");
    }

    res.status(400).json({ 
      status: "error",
      message: errorMessage 
    });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    // First check if email exists in the database
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ 
        status: "error",
        message: "Email does not exist. Please sign up first." 
      });
    }

    // If email exists, attempt login
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    
    res.status(200).json({ 
      status: "success",
      data: user 
    });
  } 
  catch (err) {
    let errorMessage = "An error occurred during login.";
    
    if (err.message === "Incorrect password") {
      errorMessage = "Invalid password.";
    }
    // Other potential errors
    else if (err.message.includes("validation failed")) {
      errorMessage = "Invalid email format.";
    }

    res.status(400).json({ 
      status: "error",
      message: errorMessage 
    });
  }
};