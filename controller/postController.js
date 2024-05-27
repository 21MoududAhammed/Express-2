
let posts = [
    { id: 1, title: "Post one" },
    { id: 2, title: "Post two" },
    { id: 3, title: "Post three" },
    { id: 4, title: "Post four" },
    { id: 5, title: "Post five" },
  ];

// @desc get posts
// @route /api/posts
// @method GET
const getPosts = (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.json(posts.slice(0, limit));
  }

  res.json(posts);
};

// @desc get single post
// @route /api/posts/:id
// @method GET
const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((item) => item.id === id);
  if (!post) {
    const error = new Error(`Post with id ${id} was not found.`);
    error.status = 404;
    return next(error);
  }

  res.json(post);
};

// @desc create a post
// @route /api/posts
// @method POST
const createPost = (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    const error = new Error(`Title is not found`);
    error.status = 401;
    return next(error);
  }
  posts.push(newPost);
  console.log(newPost);
  res.json(posts);
};

// @desc update a post
// @route /api/posts/:id
// @method PATCH
const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`The post with ${id} was not found.`);
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(post);
};

// @desc delete a post
// @route /api/posts/:id
// @method delete
const deletePost = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({ msg: "Not Found" });
  }

  posts = posts.filter((post) => post.id !== id);

  res.status(200).json(posts);
};

module.exports = {getPosts, getPost, createPost, updatePost, deletePost}
