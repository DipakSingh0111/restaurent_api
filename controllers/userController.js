const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// ==========================
// getUserController
// ==========================
const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found..." });
    }

    // hide password
    user.password = undefined;
    // resp
    res
      .status(200)
      .json({ success: true, message: "User get Successfully...", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in Get User API..." });
  }
};

// ==========================
// updateUserController
// ==========================

const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    // validation
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found..." });
    }

    // update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // save user
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User Update SuccessFully..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in Update." });
  }
};

// ==========================
// resetPasswordController
// ==========================

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer) {
      return res
        .status(500)
        .json({ success: false, message: "Please provide All Fields." });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "User Not Found or Invalid answer" });
    }
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashPassword;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password Reset SuccessFully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in resetPassword." });
  }
};

// ==========================
// updatePasswordController
// ==========================

const updatePasswordController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    // validation
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found." });
    }
    // get data from user
    const { oldPassword, newPassword, answer } = req.body;
    if (!oldPassword || !newPassword || !answer) {
      return res.status(500).json({
        success: false,
        message: "Please Provide old and new Password.",
      });
    }
    // compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      res.status(404).json({ success: false, message: "Invalid oldPassword." });
    }
    let salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password Updated SuccessFully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in Update Password." });
  }
};

// ==========================
// deleteProfileController
// ==========================

const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Delete Profile API",
      error,
    });
  }
};
module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteProfileController,
};
