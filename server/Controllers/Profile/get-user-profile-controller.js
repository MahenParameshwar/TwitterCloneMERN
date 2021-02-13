const User = require("../../Model/UserModel");
const Post = require("../../Model/PostModel");
const getPosts = require("../../Utils/getPosts");

const getUserProfileController = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { isReply } = req.query;

    let user = await User.findOne({
      username,
    }).select(["-email", "-password"]);

    if (user == null) {
      throw new Error();
    }

    user = await User.populate(user, {
      path: "followers",
      select: { password: 0, email: 0 },
    });

    user = await User.populate(user, {
      path: "following",
      select: { password: 0, email: 0 },
    });

    const searchObj = {
      postedBy: user._id,
    };

    if (isReply) {
      searchObj.replyTo = { $exists: isReply };
    }

    let posts = await getPosts(searchObj);

    res.status(200).json({
      profile: user,
      posts,
    });
  } catch (err) {
    return res.status(400).json({
      message: "User not found",
    });
  }
};

module.exports = getUserProfileController;
