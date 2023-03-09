const Joi = require("joi")

const AddBookValidator = Joi.object({
title: Joi.string()
    .min(5)
    .max(255)
    .trim()
    .required(),
description: Joi.string()
    .min(5)
    .trim()
    .required(),
isbn: Joi.string()
    .min(10)
    .max(13)
    .required(),
year: Joi.number()
    .integer()
    .optional()
    .max(2023),
price: Joi.number()
    .min(0)
    .optional(),
createdAt: Joi.date()
    .default(Date.now),
lastUpdateAt: Joi.date()
    .default(Date.now)
})


const UpdateBookValidator = Joi.object({
    description: Joi.string()
    .min(5)
    .max(255)
    .trim(),
    isbn: Joi.string()
    .min(10)
    .max(13),
    year: Joi.number()
    .integer()
    .max(2023),
    price: Joi.number()
    .min(0),
    lastUpdateAt: Joi.date()
    .default(Date.now)
})


const validateAddBookMW = async(req, res, next) =>{
    const bookPayLoad = req.body

    try{
        await AddBookValidator.validateAsync(bookPayLoad)
        next()
    }
    catch (error){
        next({
           message: error.details[0].message,
           status: 400
        }) // create an error handler MW in app.js to always display a specific error message
    }
}


const validateUpdateBookMW = async (req, res, next)=>{
    const bookUpdate = req.body

    try{
        await UpdateBookValidator.validateAsync(bookUpdate)
        next()
    }
    catch(error){
        next({
            status: 400,
            message: error.details[0].message
        })
    }
}

module.exports = {
    validateAddBookMW,
    validateUpdateBookMW
}