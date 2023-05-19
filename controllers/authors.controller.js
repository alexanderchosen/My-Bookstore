const authorModel = require('../models/author')

// get all author
function getAllAuthors(req, res){
    authorModel.find()
    .then(authors =>{
        res.status(200).json({
            status: true,
            message: authors
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(404).json({
            status: false,
            message: err
        })
    })
}

// get author by ID
function getAuthorById(req, res){
    const authorID = req.params.id

    const findAuthor = authorModel.findById({id: authorID})
    .then(author =>{
        res.status(200).json({
            status: true,
            message: author
        })
    })
    .catch(err =>{
        console.log(err)

        res.status(404).json({
        status: false,
        message: err
    })
})
}

// add new author
const addAuthors = function(req, res){
    const profile = req.body

    authorModel.create({
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: profile.username,
        bio: profile.bio,
        DOB: profile.DOB,
        country: profile.country,
        books: profile.books,
        createdAt: new Date(),
        lastUpdatedAt: new Date()
    })
    .then(author =>{
        res.status(200).json({
            status: true,
            message: author
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(404).json({
            status: false,
            message: err
        })
    })
}

// update author bio and username
const updateAuthor = function(req, res){
    const id = req.params.id

    const {bio, username} = req.body

    const updatedAuthor = authorModel.findByIdAndUpdate({id: id})
    .then(authorUpdated =>{
        res.status(200).json({
            status: true,
            message: {
                "_id": updatedAuthor.id,
                "username": updatedAuthor.username = username ||updatedAuthor.username,
                "bio": updatedAuthor.bio = bio || updatedAuthor.bio,
                "books": updatedAuthor.books,
                "lastUpdatedAt": new Date()
            }
        })
    })
    updatedAuthor.save()
    .catch(err =>{
        console.log(err)

        res.status(404).json({
            status: false,
            message: err
        })
    })
}

// delete or remove an author by ID
function deleteAuthor (req, res){
    const id = req.params.id

    authorModel.findByIdAndDelete({id: id})
    .then(deletedAuthor =>{
        res.status(200).json({
            status: true,
            message: deleteAuthor
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(404).json({
            status: false,
            message: err
        })
    })
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    addAuthors,
    updateAuthor,
    deleteAuthor
}


