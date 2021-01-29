const User = require("../Model/UserModel");
const Post = require("../Model/PostModel");

const likePostController = async (req, res) => {
  //User Id
  try {
    const { data: userId } = req.id;
    const { postId } = req.params;
    const user = await User.findOne({ _id: userId });

    const isLiked = user.likes && user.likes.includes(postId);
    const option = isLiked ? "$pull" : "$addToSet";

    //Insert user like; pull delets and addToSet adds to the likes array
    await User.findByIdAndUpdate(
      userId,
      { [option]: { likes: postId } },
      { useFindAndModify: false }
    );

    //Insert post like; pull delets and addToSet adds to the likes array
    let post = await Post.findByIdAndUpdate(
      postId,
      { [option]: { likes: userId } },
      { useFindAndModify: false, new: true }
    ).populate({
      path: "postedBy",
      select: { password: 0, email: 0 },
    });

    post.populate();

    res.status(200).json({
      post,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = likePostController;
