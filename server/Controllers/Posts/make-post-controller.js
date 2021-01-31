const Post = require("../../Model/PostModel");
const User = require("../../Model/UserModel");

const makePostController = async (req, res, next) => {
  const { data: _id } = req.id;
  const { content, postId } = req.body;
  const data = {
    content,
    postedBy: _id,
  };

  if (postId) {
    data.replyTo = postId;
  }
  console.log(data);
  Post.create(data)
    .then(async (newPost) => {
      return next();
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({
        message: "Could not add post",
        status: "404",
      });
    });
};

module.exports = makePostController;
