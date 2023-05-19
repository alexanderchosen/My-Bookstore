const mongoose = require("mongoose")

const Schema = mongoose.Schema

// how to add images as a  required schema?
const AuthorSchema = new Schema ({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    bio:{
        type: String,
        required: true
    },
    DOB:{
        type: Date
    },
    country:{
        type: String
    },
    books:{
        type: Array,
        default: []
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    lastUpdatedAt:{
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('authors', AuthorSchema)