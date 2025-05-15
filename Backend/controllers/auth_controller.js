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
  const { username , email, password 
   // , phone , address ,avatar,wishlist 
   } = req.body;
  console.log(req.body);
  try {
    
    const user = await User.create({ username,email, password 
     // , phone ,address ,avatar,wishlist 
    });  // this is an async function and need to be awaited
    console.log(user);
    const token = createToken(user._id);
    console.log(token);
    res.cookie('jwt', token, {  maxAge: maxAge * 1000 });
    //res.cookie('alshimaa', token, {  maxAge: maxAge * 2000 });

    res.status(201).json(user._id);
    console.log(user);

  }
  catch(err) {
    //console.log(err);
  //  const errors = handleErrors(err);
    res.status(400).send(err);
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    console.log(token);

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    //const errors = handleErrors(err);
    res.status(400).send(err);
  }

}