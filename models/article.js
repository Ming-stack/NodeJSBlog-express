const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Article = new Schema({
    title: String,
    content: String,
    cover: String,
    desc: String,
    pubdate: String,
    categories: {
        ref: 'Categories',
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('Articles', Article)