const Post = require("../Model/PostModel");
const User = require("../Model/UserModel");

const getPostsController = async (req, res) => {
  //   const { data: _id } = req.id;
  Post.find()
    .populate({
      path: "postedBy",
      select: { password: 0, email: 0 },
    })
    .sort({
      createdAt: -1,
    })
    .then((results) => {
      return res.status(200).json({
        results,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message,
      });
    });
};

module.exports = getPostsController;
