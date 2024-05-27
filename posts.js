const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("./controller/postController");

// get all posts
router.get("/", getPosts);

// get a post based on id
router.get("/:id", getPost);

// create a post
router.post("/", createPost);

// update a post
router.patch("/:id", updatePost);

// delete a post
router.delete("/:id", deletePost);

module.exports = router;
