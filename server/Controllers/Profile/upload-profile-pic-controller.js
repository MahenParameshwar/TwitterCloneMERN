const User = require("../../Model/UserModel");
const cloudinary = require("cloudinary").v2;

const updateProfilePicController = async (req, res, next) => {
  //User Id

  try {
    const { data: logedUserId } = req.id;

    cloudinary.config({
      cloud_name: "dmhufchvb",
      api_key: "429346941241973",
      api_secret: "B_MJIkI4eCvs44jEdS-2HTpKXNg",
    });
    //currentUser

    console.log(req.body.isCoverPic);
    const uploadResponse = await cloudinary.uploader.upload(
      req.body.profilePic
    );

    const option = req.body.isCoverPic
      ? {
          coverPic: uploadResponse.url,
        }
      : {
          profilePic: uploadResponse.url,
        };

    let user = await User.findByIdAndUpdate(logedUserId, option, {
      new: true,

      useFindAndModify: false,
    }).select(["-email", "-password"]);

    console.log(user);

    return res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = updateProfilePicController;
