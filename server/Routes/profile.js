const express = require("express");
const getProfilesController = require("../Controllers/Profile/get-profiles-controller");

const getUserProfileController = require("../Controllers/Profile/get-user-profile-controller");
const handleFollowUserController = require("../Controllers/Profile/handle-follow-user-controller");
const searchProfileController = require("../Controllers/Profile/search-Profile-Controler");
const updateProfilePicController = require("../Controllers/Profile/upload-profile-pic-controller");
const authenticateToken = require("../Middleware/authenticateToken");

const routes = express.Router();

routes.get("/profile/:username", getUserProfileController);
routes.post(
  "/auth/profile/:profileId/follow",
  authenticateToken,
  handleFollowUserController
);

routes.post(
  "/auth/profile/updateProfilePic",
  authenticateToken,
  updateProfilePicController
);

routes.get("/auth/search/profiles", authenticateToken, searchProfileController);
routes.get("/auth/profiles", authenticateToken, getProfilesController);

module.exports = routes;
