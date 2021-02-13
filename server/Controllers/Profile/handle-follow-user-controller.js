const User = require("../../Model/UserModel");
const Post = require("../../Model/PostModel");

const handleFollowUserController = async (req, res, next) => {
  //User Id
  try {
    const { data: logedUserId } = req.id;
    const { profileId: toFollowUserId } = req.params;
    console.log(toFollowUserId);

    //currentUser
    let logedUser = await User.findOne({ _id: logedUserId });

    const isfollowing =
      logedUser.following && logedUser.following.includes(toFollowUserId);
    const option = isfollowing ? "$pull" : "$addToSet";

    //Insert user like; pull delets and addToSet adds unique values to the likes array
    logedUser = await User.findByIdAndUpdate(
      logedUserId,
      { [option]: { following: toFollowUserId } },
      { new: true, useFindAndModify: false }
    );

    let profile = await User.findByIdAndUpdate(
      toFollowUserId,
      { [option]: { followers: logedUserId } },
      { new: true, useFindAndModify: false }
    );

    profile = await User.populate(profile, {
      path: "followers",
      select: { password: 0, email: 0 },
    });

    profile = await User.populate(profile, {
      path: "following",
      select: { password: 0, email: 0 },
    });

    profile["email"] = "";

    profile["password"] = "";

    logedUser["email"] = "";

    logedUser["password"] = "";

    return res.status(200).json({
      profile,
      logedUser,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = handleFollowUserController;
