const User = require("../../Model/UserModel");
const Post = require("../../Model/PostModel");
const getPosts = require("../../Utils/getPosts");

const getUserProfileController = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { isReply } = req.query;
    console.log(isReply);
    let user = await User.findOne({
      username,
    }).select(["-email", "-password"]);

    if (user == null) {
      throw new Error();
    }

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
