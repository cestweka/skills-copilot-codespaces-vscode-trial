// Create web server
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Create a new Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define a schema for comments
const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String,
});

// Create a model for comments
const Comment = mongoose.model('Comment', commentSchema);

// Routes
app.post('/comments', async (req, res) => {
  const { name, email, comment } = req.body;
  const newComment = new Comment({ name, email, comment });
  await newComment.save();
  res.status(201).json(newComment);
});

app.get('/comments', async (req, res) => {
  const comments = await Comment.find();
  res.status(200).json(comments);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});