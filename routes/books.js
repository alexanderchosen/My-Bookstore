const express = require("express")
const {validateAddBookMW, validateUpdateBookMW} = require("../validators/book.validator")
const booksModel = require("../models/books")

const bookRouter = express.Router()

bookRouter.get('/', (req, res)=>{
    booksModel.find()
    .then(books =>{
        res.status(200).json({
            status: true,
            messsage: books
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(404).json({
            status: false,
            message: err
        })
    }) 
})

bookRouter.post('/new', validateAddBookMW, (req, res)=>{
    const reqBody = req.body

    const book = booksModel.create({
        title: reqBody.title,
        description: reqBody.description,
        isbn: reqBody.isbn,
        year: reqBody.year,
        price: reqBody.price,
        createdAt: new Date(),
        lastUpdateAt: new Date()
    })
    .then(book =>{
        res.status(200).json({
            status: true,
            message: book
        })
    }).catch(err =>{
        const errorStatus = err.status
        res.status(errorStatus).json({
            status: false,
            message: err
        })
    }) 
})

bookRouter.put('/edit/:id', validateUpdateBookMW, (req, res)=>{
    // fetch the update from the body and id from params, update the lasUpdateAt field with current time

    const id = req.params.id
    const bookUpdate = req.body

    bookUpdate.lastUpdateAt = new Date() // try Date.now

    // use booksModel to find and update book by ID, 
    const updatedBook = booksModel.findByIdAndUpdate(id)
    .then(updatedBook =>{
        res.status(200).json({
            status: true,
            message:updatedBook
        })
    }).catch(err =>{
        const errorStatus = err.status
        res.status(errorStatus).json({
            status: false,
            message: err
        })
    })
    // then, respond book update if successful and catch error if not successful
})

module.exports = bookRouter