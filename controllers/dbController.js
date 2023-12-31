const User = require("../models/User");
const cloudinary = require("cloudinary");
const phosusController = require("./phosusController");

cloudinary.config({
  cloud_name: "dk98nlyp4",
  api_key: "228756186924527",
  api_secret: "87PrnJGKDEbPn7LuXnepozxqx5I",
});

module.exports.change_pic = async (req, res) => {
  try {
    // Assuming you are getting user's id from some session or JWT
    const userId = res.locals.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userpic: req.body.newImageUrl },
      { new: true }
    );
    phosusController.removeBG(req.body.newImageUrl);

    if (updatedUser) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.json({ success: false });
  }
};

module.exports.renderHomePage = async (req, res) => {
  try {
    const users = await User.find();
    res.render("home", { users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.render("home");
  }
};

module.exports.viewUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.render("userprofile", { user });
  } catch (err) {
    console.error("Error fetching user by username:", err);
    res.status(500).send("Server Error");
  }
};
