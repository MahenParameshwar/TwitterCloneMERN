const Post = require("../../Model/PostModel");
const User = require("../../Model/UserModel");
const cloudinary = require("cloudinary").v2;

const makePostController = async (req, res, next) => {
  const { data: _id } = req.id;
  const { content, postId, tweetPic } = req.body;

  const data = {
    content,
    postedBy: _id,
  };

  if (tweetPic) {
    cloudinary.config({
      cloud_name: "dmhufchvb",
      api_key: "429346941241973",
      api_secret: "B_MJIkI4eCvs44jEdS-2HTpKXNg",
    });
    //currentUser

    const uploadResponse = await cloudinary.uploader.upload(tweetPic);
    data.tweetPic = uploadResponse.url;
  }

  if (postId) {
    data.replyTo = postId;
  }

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
