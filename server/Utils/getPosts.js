const Post = require("../Model/PostModel");
const User = require("../Model/UserModel");

const getPosts = async (searchObj) => {
  const results = Post.find(searchObj)
    .populate({
      path: "postedBy",
      select: { password: 0, email: 0 },
    })
    .populate({
      path: "retweetData",
    })
    .sort({
      createdAt: -1,
    })
    .then(async (results) => {
      results = await User.populate(results, {
        path: "retweetData.postedBy",
        select: { password: 0, email: 0 },
      });

      results = await Post.populate(results, {
        path: "replyTo",
      });

      results = await User.populate(results, {
        path: "replyTo.postedBy",
        select: { password: 0, email: 0 },
      });

      return results;
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  return results;
};

module.exports = getPosts;
