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

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;

    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex === -1) {
        res.status(404).json({ error: 'Buch nicht gefunden' });
    } else {
        books[bookIndex] = updatedBook;
        res.json(updatedBook);
    }
});

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (bookIndex === -1) {
        res.status(404).json({ error: 'Buch nicht gefunden' });
    } else {
        books.splice(bookIndex, 1);
        res.json({ message: 'Buch erfolgreich gelöscht' });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});