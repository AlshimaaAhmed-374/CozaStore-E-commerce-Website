const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email'],
      validate: [isEmail, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: true,
      minlength: [8,'Minimum password length is 6 characters'],
      select: true // Never return password in queries
    },
    phone: {
      type: String,
      default: '',
      trim: true
    },
    address: {
      type: String,
      default: '',
      trim: true
    },
    avatar: {
      type: String,
      default: '',
      trim: true
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  {
    timestamps: true
  }
);

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  console.log(user);
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    console.log("the result",auth);
    if (auth) {
      console.log('user authenticated');
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;