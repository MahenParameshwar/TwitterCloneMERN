const express = require("express");

const getUserProfileController = require("../Controllers/Profile/get-user-profile-controller");
const handleFollowUserController = require("../Controllers/Profile/handle-follow-user-controller");
const authenticateToken = require("../Middleware/authenticateToken");

const routes = express.Router();

routes.get("/profile/:username", getUserProfileController);
routes.post(
  "/auth/profile/:profileId/follow",
  authenticateToken,
  handleFollowUserController
);

module.exports = routes;
