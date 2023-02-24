const mongoose = require("mongoose")

const Schema = mongoose.Schema

const BookSchema = new Schema ({
    title: {
        type: String,
        required: true,
        max: [255, "Title must not be more than 250 characters"], // using validation with custom messages
        unique: [true, "Book title must also be unique"]
    },
    description: {
        type: String,
        required: true
    },
    isbn: {
        type: Number,
        required: true,
        unique: [true, "Each book must have a unique ISBN"]
    },
    year: {
        type: Number,
        max:[2023, "Year must not exceed our current year 2023"]
    },
    price:{
        type: Number,
        min: [0, "price must be >= 0"]
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    lastUpdateAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('books', BookSchema) // collection name and the name of schema used