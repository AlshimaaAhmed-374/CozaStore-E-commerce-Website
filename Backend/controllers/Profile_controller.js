const User = require('../models/users.model');

exports.getUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE Profile (improved version)

exports.updateProfile = async (req, res) => {
  try {
    console.log("\n--- START OF UPDATE ---");

    const userId = req.user._id;
    const {username , email , password , phone, address, avatar } = req.body;

    console.log("User ID from JWT:", userId);
    console.log("Request Body:", {username , email , password , phone, address, avatar });

    // 1. Get user before update
    const beforeUpdate = await User.findById(userId).lean(); // lean() returns plain JS object
    // console.log("User BEFORE update:", {
    //   phone: beforeUpdate?.phone,
    //   address: beforeUpdate?.address,
    //   avatar: beforeUpdate?.avatar
    // });

    // 2. Prepare updates (only send defined fields)
    const updates = {};
    if (username !== undefined) updates.username = username;
    if (email !== undefined) updates.email = email;
    if (phone !== undefined) updates.phone = phone;
    if (address !== undefined) updates.address = address;
    if (avatar !== undefined) updates.avatar = avatar;

    console.log("Updates to apply:", updates);

    // 3. Perform update and get the new user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true } // get updated doc, enforce schema
    ).lean();

    // 4. Show user after update
    console.log(updatedUser);

    // 5. Detect change
    const changed = (
      updatedUser?.phone !== beforeUpdate?.phone ||
      updatedUser?.address !== beforeUpdate?.address ||
      updatedUser?.avatar !== beforeUpdate?.avatar
    );

    if (!changed) {
      console.warn("WARNING: No changes detected in database!");
    }

    // 6. Remove sensitive fields
    if (updatedUser) {
      delete updatedUser.password;
    }

    res.status(200).json({
      status: "success",
      data: updatedUser
    });

    console.log("--- END OF UPDATE ---\n");

  } catch (err) {
    console.error("FULL ERROR DETAILS:", {
      message: err.message,
      stack: err.stack,
      code: err.code,
      name: err.name
    });
    res.status(500).json({ error: "Server error" });
  }
};