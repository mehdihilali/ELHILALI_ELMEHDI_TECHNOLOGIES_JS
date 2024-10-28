const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Book = require('./models/BookModel');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/books_mehdiDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// POST route to add a new book
app.post('/books', async (req, res) => {
    try {
        const bookData = req.body;
        const book = new Book(bookData);
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET route to retrieve all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});