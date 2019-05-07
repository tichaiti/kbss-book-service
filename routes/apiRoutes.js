const express = require('express');

const router = express.Router();
const booksControllers = require('../controllers/bookController');
const authorControllers = require('../controllers/authorController');

// Matches with "/api/books"
router
    .route('/books')
    .get(booksControllers.findAll)
    .post(booksControllers.create);

// Matches with "/api/books/:id"
router
    .route('/books/:id')
    .get(booksControllers.findById)
    .put(booksControllers.update)
    .delete(booksControllers.remove);


// Matches with "/api/authors"
router
    .route('/authors')
    .get(authorControllers.findAll)
    .post(authorControllers.create);

// Matches with "/api/authors/:id"
router
    .route('/authors/:id')
    .get(authorControllers.findById)
    .put(authorControllers.update)
    .delete(authorControllers.remove);

module.exports = router;
