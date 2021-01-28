const mongoose = require("mongoose");
const User = require("../Model/UserModel");

const registerUser = async (req, res) => {
  try {
    const { email, password, firstname, lastname, username } = req.body;
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      let message = "";
      if (email === user.email) {
        message = "Email already exists";
      } else {
        message = "Username already exists";
      }
      return res.status(400).json({
        error: true,
        message,
      });
    }

    User.create({
      email,
      password,
      firstname,
      lastname,
      username,
    }).then((user) => {
      return res.status(200).json({
        message: "Registered Successfully",
      });
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: "Something wen wrong",
    });
  }
};

module.exports = registerUser;
