const User = require("../../Model/UserModel");

const searchProfileController = async (req, res) => {
  try {
    let results = await User.find({
      username: { $regex: req.query.searchQuery, $options: "i" },
    }).select(["-email", "-password"]);

    return res.status(200).json({
      results,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = searchProfileController;
