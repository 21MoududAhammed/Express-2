const express = require("express");
const router = express.Router();

let posts = [
  { id: 1, title: "Post one" },
  { id: 2, title: "Post two" },
  { id: 3, title: "Post three" },
  { id: 4, title: "Post four" },
  { id: 5, title: "Post five" },
];

// get all posts
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.json(posts.slice(0, limit));
  }

  res.json(posts);
});

// get a post based on id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((item) => item.id === id);
  if (!post) {
    return res.status(404).json({ message: `${id} no post was not found.` });
  }

  res.json(post);
});

// create a post
router.post("/", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    return res.status(400).json({ message: `Post has not created.` });
  }
  posts.push(newPost);
  console.log(newPost);
  res.json(posts);
});

// update a post
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({ msg: `${id} no post was not found` });
  }

  post.title = req.body.title;
  res.status(200).json(post);
});

// delete a post
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({ msg: "Not Found" });
  }

  posts = posts.filter((post) => post.id !== id);

  res.status(200).json(posts);
});

module.exports = router;
