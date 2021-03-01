const Post = require("../../Model/PostModel");
const User = require("../../Model/UserModel");
const getPosts = require("../../Utils/getPosts");

const searchPostsController = async (req, res) => {
  try {
    let results = await getPosts({
      content: { $regex: req.query.searchQuery, $options: "i" },
    });
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

module.exports = searchPostsController;
