const express = require("express");
const path = require("path");
const postRouter = require("./posts");

const port = process.env.PORT || 8000;
// create an express application 
const app = express();

// body parser middleware 
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use("/api/posts", postRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
