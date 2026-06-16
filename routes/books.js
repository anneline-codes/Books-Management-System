const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// POST /api/books — Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, price } = req.body;

    const book = new Book({ title, author, price });
    const savedBook = await book.save();

    res.status(201).json({
      message: 'Book added successfully',
      book: savedBook,
    });
  } catch (error) {
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    res.status(500).json({ error: 'Server error while adding book' });
  }
});

// GET /api/books — Return all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching books' });
  }
});

// GET /api/books/:id — Return one book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json({ book });
  } catch (error) {
    // Invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid book ID format' });
    }
    res.status(500).json({ error: 'Server error while fetching book' });
  }
});

// PUT /api/books/:id — Update a book
router.put('/:id', async (req, res) => {
  try {
    const { title, author, price } = req.body;

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, price },
      {
        new: true,          // return the updated document
        runValidators: true, // run schema validations on update
      }
    );

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json({
      message: 'Book updated successfully',
      book,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid book ID format' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    res.status(500).json({ error: 'Server error while updating book' });
  }
});

// DELETE /api/books/:id — Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json({
      message: 'Book deleted successfully',
      book,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid book ID format' });
    }
    res.status(500).json({ error: 'Server error while deleting book' });
  }
});

module.exports = router;
