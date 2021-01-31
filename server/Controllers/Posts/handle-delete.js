const User = require("../../Model/UserModel");
const Post = require("../../Model/PostModel");

const deletePostController = async (req, res, next) => {
  //User Id
  try {
    const { postId } = req.params;

    await Post.findByIdAndDelete(postId);

    return next();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = deletePostController;
