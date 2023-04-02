const express = require("express")
const {validateAddBookMW, validateUpdateBookMW} = require("../validators/book.validator")
const booksController = require("../controllers/books.controller")

const bookRouter = express.Router()

bookRouter.get('/all', booksController.getAllBooks )

bookRouter.get('/:id', booksController.getBookById)

bookRouter.post('/new', validateAddBookMW, booksController.postBook)

bookRouter.put('/edit/:id', validateUpdateBookMW, booksController.updateBook)


// delete route
bookRouter.delete("/delete/:id", booksController.deleteBookById)

module.exports = bookRouter