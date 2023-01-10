const Post = require("../models/Posts");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts.length) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, body } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!body) {
    emptyFields.push("body");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try {
    const post = await Post.create({ title, body });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllPosts, createPost };
