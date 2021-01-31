const express = require("express");
const makePostController = require("../Controllers/Posts/make-post-controller");
const getPostsController = require("../Controllers/Posts/get-posts-controller");
const getPostController = require("../Controllers/Posts/get-post-controller");
const authenticateToken = require("../Middleware/authenticateToken");
const likePostController = require("../Controllers/Posts/handle-like");
const retweetPostController = require("../Controllers/Posts/handle-retweet");
const deletePostController = require("../Controllers/Posts/handle-delete");

const routes = express.Router();

routes.post(
  "/auth/post",
  [authenticateToken, makePostController],
  getPostsController
);

routes.get("/posts", getPostsController);
routes.get("/viewpost/:id", getPostController);

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

routes.delete(
  "/auth/post/:postId/delete",
  [authenticateToken, deletePostController],
  getPostsController
);

module.exports = routes;
