const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    pages: Number,
    status: String,
    price: Number,
    pagesRead: Number,
    format: String,
    suggestedBy: String,
    finished: Boolean
});

module.exports = mongoose.model('Book', bookSchema);
