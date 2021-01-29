const User = require("../Model/UserModel");

const userController = async (req, res) => {
  const { data: _id } = req.id;

  try {
    const user = await User.findOne({ _id });

    if (user) {
      const { username, profilePic } = user;

      res.status(200).json({
        _id,
        username,
        profilePic,
      });
    } else throw new Error();
  } catch (err) {
    res.status(404).json({
      message: "Could not load data",
      status: "404",
    });
  }
};

module.exports = userController;
