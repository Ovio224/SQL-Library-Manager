var express = require('express');
var router = express.Router();
var Book = require('../models').Book;

/* GET /books to show all books */
router.get('/', (req, res, next) => {
  Book.findAll({order: [["createdAt", "DESC"]]}).then(books => {
    res.render('books/index', {books: books});
  }).catch(err => res.send(500));
});

// GET new book
router.get('/new', (req, res, next) => {
  res.render('books/new', {book: Book.build()});
});

// POST new book
router.post('/new', (req, res, next) => {
  Book.create(req.body).then(book => {
    res.redirect("/books/" + book.id);
  }).catch(err => {
    if(err.name === "SequelizeValidationError"){
      res.render("books/new", {
        book: Book.build(req.body),
        errors: err.errors
      });
    } else {
      throw err;
    }
  }).catch(err => res.send(500));
});

// GET detailed info about an individual book
router.get('/:id', (req, res, next) => {
  Book.findByPk(req.params.id).then(book => {
    if(book) {
      res.render('books/update', {
        book: book,
        title: book.title,
        author: book.author,
        genre: book.genre,
        year: book.year
      });
    } 
    
  })
  
});

// Edit/update the book
router.post('/:id', (req, res, next) => {
  res.render('books/update');
});

// Delete the book
router.post('/:id/delete', (req, res, next) => {
  // delete book
});

module.exports = router;
