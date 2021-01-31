const Post = require("../../Model/PostModel");
const User = require("../../Model/UserModel");
const getPosts = require("../../Utils/getPosts");

const getPostsController = async (req, res) => {
  //   const { data: _id } = req.id;
  try {
    let results = await getPosts({});
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

module.exports = getPostsController;
