var express = require('express');
var router = express.Router();
var Book = require('../models').Book;

/* GET /books to show all books */
router.get('/', (req, res, next) => {
  Book.findAll({
    order: [
      ["createdAt", "DESC"]
    ]
  }).then(books => {
    res.render('books/index', {
      books: books
    });
  }).catch(err => res.render('./error', {
    message: err.message,
    error: err
  }));
});

// GET new book
router.get('/new', (req, res, next) => {
  res.render('books/new', {
    book: Book.build()
  });
});

// POST new book
router.post('/new', (req, res, next) => {
  Book.create(req.body).then(book => {
    res.redirect(`/books`);
    console.log(book.id)
  }).catch(err => {
    if (err.name === "SequelizeValidationError") {
      res.render("books/new", {
        book: Book.build(req.body),
        errors: err.errors
      });
    } else {
      throw err;
    }
  }).catch(err => res.render('./error', {
    message: err.message,
    error: err
  }));
});

// GET detailed info about an individual book
router.get('/book-:id', (req, res, next) => {
  Book.findByPk(req.params.id).then(book => {
    if (book) {
      res.render('books/update', {
        book: book
      });
    } else {
      res.render('./notFound');
    }
  }).catch(err => res.render('./error', {
    message: err.message,
    error: err
  }));
});

// Edit/update the book
router.post('/book-:id', (req, res, next) => {
  Book.findByPk(req.params.id).then(book => {
      if (book) {
        return book.update(req.body);
      } else {
        res.render('./notFound');
      }
    }).then((book) => res.redirect('/books'))
    // TODO: BOOK update popup
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        var book = Book.build(req.body);
        book.id = req.params.id;
        res.render("books/update", {
          errors: err.errors,
          book: book
        });
      } else {
        throw err
      }
    }).catch(err => res.render('error', {
      message: err.message,
      error: err
    }));
});

// GET delete form
router.get('/book-:id', (req, res, next) => {
  Book.findByPk(req.params.id).then(book => {
    if (book) {
      res.render('books/delete', {
        title: book.title,
        book: book
      });
    }
  });
});


// Delete the book
router.post('/book-:id/delete', (req, res, next) => {
  Book.findByPk(req.params.id).then(book => {
      if (book) {
        return book.destroy();
      } else {
        res.render('./notFound');
      }
    }).then(() => res.redirect("/books"))
    .catch(err => res.render('error', {
      message: err.message,
      error: err
    }));
});

module.exports = router;
