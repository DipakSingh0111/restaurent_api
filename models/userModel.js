const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "Phone Number is required"],
    },
    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vender", "driver"],
    },
    profile: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/17/17004.png",
    },
    answer: {
      type: String,
      required: [true, "Answer is required."],
    },
  },
  { timestamps: true }
);

// exports
module.exports = mongoose.model("User", userSchema);
