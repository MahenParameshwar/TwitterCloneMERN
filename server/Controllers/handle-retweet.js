const User = require("../Model/UserModel");
const Post = require("../Model/PostModel");

const retweetPostController = async (req, res, next) => {
  //User Id
  try {
    const { data: userId } = req.id;
    const { postId } = req.params;
    const user = await User.findOne({ _id: userId });

    //Try and delete retweet if user has retweeted it
    const deletePost = await Post.findOneAndDelete({
      postedBy: userId,
      retweetData: postId,
    });

    const option = deletePost !== null ? "$pull" : "$addToSet";

    let retweet = deletePost;

    if (retweet == null) {
      retweet = await Post.create({ postedBy: userId, retweetData: postId });
    }

    //pull deletes and addToSet adds unique values to the likes array
    //Brackets are used when you try to use a variable [option] where option is a variable
    await User.findByIdAndUpdate(
      userId,
      { [option]: { retweets: retweet._id } },
      { useFindAndModify: false }
    );

    //Insert post like; pull delets and addToSet adds adds unique values to the likes array
    let post = await Post.findByIdAndUpdate(
      postId,
      { [option]: { retweetUsers: userId } },
      { useFindAndModify: false, new: true }
    ).populate({
      path: "postedBy",
      select: { password: 0, email: 0 },
    });

    return next();
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = retweetPostController;
