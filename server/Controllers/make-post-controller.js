const Post = require("../Model/PostModel");
const User = require("../Model/UserModel");

const makePostController = async (req, res) => {
  const { data: _id } = req.id;
  const { content } = req.body;
  console.log(content);
  Post.create({
    content,
    postedBy: _id,
  })
    .then(async (newPost) => {
      newPost = await User.populate(newPost, {
        path: "postedBy",
        select: { password: 0, email: 0 },
      });
      return res.status(201).json({
        message: "Added post successfully",
        newPost,
      });
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
