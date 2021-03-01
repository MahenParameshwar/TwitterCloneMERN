const User = require("../../Model/UserModel");

const getProfilesController = async (req, res) => {
  const { data: _id } = req.id;
  try {
    let results = await User.find({ _id: { $nin: [_id] } }).select([
      "-email",
      "-password",
    ]);

    return res.status(200).json({
      results,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = getProfilesController;
