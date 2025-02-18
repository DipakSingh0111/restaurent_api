const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =========================
// REGISTER CONTROLLER
// =========================

const registerCOntroller = async (req, res) => {
  try {
    const { userName, email, password, address, phone, answer } = req.body;

    if (!userName || !email || !password || !address || !phone || !answer) {
      res
        .status(500)
        .json({ success: false, message: "Please Provide All Fields." });
    }

    // check email
    const existing = await userModel.findOne({ email });
    if (existing) {
      res.status(500).json({
        success: false,
        message: "Email allReady Register. Please Login.",
      });
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create a user
    const user = await userModel.create({
      userName,
      email,
      password: hashPassword,
      address,
      phone,
      answer,
    });

    res
      .status(200)
      .json({ success: true, messgae: "Register SuccessFully", user });
  } catch (error) {
    res.status(500).json({ message: "Error in Register API", success: false });
    console.log(error);
  }
};

// =========================
// LOGIN CONTROLLER
// =========================

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .staus(500)
        .json({ message: "Please Provide email and password", success: false });
    }

    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      res.staus(404).json({ success: false, message: "User Not found." });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(404).json({ success: false, message: "Invalid Credentials." });
    }

    // token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;

    res
      .status(200)
      .json({ success: true, message: "Login Successfully", token, user });
  } catch (error) {
    res.status(500).json({ message: "Error in Login API", success: false });
    console.log(error);
  }
};

module.exports = { registerCOntroller, loginController };
