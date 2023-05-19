// require express, author controller, middleware for authors
const express = require('express')
const authorController = require('../controllers/authors.controller')
const {AddAuthorValidatorMW, UpdateAuthorValidatorMW} = require('../validators/authors.validator')


const authorRouter = express.Router()

authorRouter.get('/', authorController.getAllAuthors)

authorRouter.get('/profile/:authorID', authorController.getAuthorById)

authorRouter.post('/create', AddAuthorValidatorMW, authorController.addAuthors)

authorRouter.put('/update/:id', UpdateAuthorValidatorMW, authorController.updateAuthor)

authorRouter.delete('/delete/:id', authorController.deleteAuthor)

module.exports = authorRouter