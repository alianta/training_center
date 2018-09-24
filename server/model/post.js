const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const postSchema = new Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: Array, required: true },
  image: { type: String, required: false },
  description: { type: String, required: true }
}, { collection : 'post' });
 
const Post = mongoose.model('Post', postSchema);
module.exports = Post;