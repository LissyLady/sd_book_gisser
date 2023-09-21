const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const books = [];

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.post('/api/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.json(newBook);
});

app.put('/api/books/:isbn', (req, res) => {
    const bookISBN = req.params.isbn;
    const updatedBook = req.body;

    const bookIndex = books.findIndex((book) => book.isbn === bookISBN);

    if (bookIndex === -1) {
        res.status(404).json({ error: 'Book not found' });
    } else {
        books[bookIndex] = updatedBook;
        res.json(updatedBook);
    }
});

app.delete('/api/books/:isbn', (req, res) => {
    const bookISBN = req.params.isbn;
    const bookIndex = books.findIndex((book) => book.isbn === bookISBN);

    if (bookIndex === -1) {
        res.status(404).json({ error: 'Book not found' });
    } else {
        books.splice(bookIndex, 1);
        res.json({ message: 'Book deleted' });
    }
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});