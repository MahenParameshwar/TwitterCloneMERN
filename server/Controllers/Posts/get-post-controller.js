const Post = require("../../Model/PostModel");
const User = require("../../Model/UserModel");

const getPosts = async (filter, res) => {
  try {
    let post = await Post.find(filter)
      .populate({
        path: "postedBy",
        select: { password: 0, email: 0 },
      })
      .populate({
        path: "retweetData",
      })
      .sort({
        createdAt: -1,
      });

    post = await User.populate(post, {
      path: "retweetData.postedBy",
      select: { password: 0, email: 0 },
    });

    post = await Post.populate(post, {
      path: "replyTo",
    });

    posts = await User.populate(post, {
      path: "replyTo.postedBy",
      select: { password: 0, email: 0 },
    });

    return post;
  } catch (err) {
    res.status(400);
  }
};

const getPostController = async (req, res) => {
  const _id = req.params.id;
  let posts = await getPosts({ _id }, res);
  let postData = posts[0];
  if (postData == undefined) {
    console.log(true);
    return res.redirect("https://www.google.com/");
  }
  let result = {
    postData,
  };

  if (postData.replyTo !== undefined) {
    result.replyTo = await getPosts({ _id: postData.replyTo });
  }

  result.replies = await getPosts({ replyTo: _id });

  return res.status(200).json({
    result,
  });
};

module.exports = getPostController;
