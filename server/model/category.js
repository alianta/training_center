const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const postSchema = new Schema({
  name: { type: String, required: true },
}, { collection : 'categories' }); //collection - имя таблицы в базе mongo
 
const Category = mongoose.model('Category', postSchema);
module.exports = Category;