const express = require("express");
const makePostController = require("../Controllers/make-post-controller");
const getPostsController = require("../Controllers/get-posts-controller");
const authenticateToken = require("../Middleware/authenticateToken");
const likePostController = require("../Controllers/handle-like");
const retweetPostController = require("../Controllers/handle-retweet");

const routes = express.Router();

routes.post("/auth/post", authenticateToken, makePostController);
routes.get("/auth/post", getPostsController);
routes.put(
  "/auth/post/:postId/like",
  [authenticateToken, likePostController],
  getPostsController
);
routes.post(
  "/auth/post/:postId/retweet",
  [authenticateToken, retweetPostController],
  getPostsController
);

module.exports = routes;
