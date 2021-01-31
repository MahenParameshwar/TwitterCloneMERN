const express = require("express");

const getUserProfileController = require("../Controllers/Profile/get-user-profile-controller");
const routes = express.Router();

routes.get("/profile/:username", getUserProfileController);

module.exports = routes;
