const express = require("express");
const userController = require("../Controllers/user-controller");
const authenticateToken = require("../Middleware/authenticateToken");

const routes = express.Router();

routes.get("/auth/user", authenticateToken, userController);

module.exports = routes;
