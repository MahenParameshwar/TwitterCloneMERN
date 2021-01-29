const express = require("express");
const makePostController = require("../Controllers/make-post-controller");
const getPostsController = require("../Controllers/get-posts-controller");
const authenticateToken = require("../Middleware/authenticateToken");
const likePostController = require("../Controllers/handle-like");

const routes = express.Router();

routes.post("/auth/post", authenticateToken, makePostController);
routes.get("/auth/post", getPostsController);
routes.put("/auth/post/:postId/like", authenticateToken, likePostController);

module.exports = routes;
