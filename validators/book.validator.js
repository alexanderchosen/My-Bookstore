const Joi = require("joi")

const BookValidator = Joi.object({
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
    .trim()
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

const validateBookMW = async(req, res, next) =>{
    const bookPayLoad = req.body

    try{
        await BookValidator.validateAsync(bookPayLoad)
        next()
    }
    catch (error){
        next(error.details[0].message) // create an error handler MW in app.js to always display a specific error message
    }
}

module.exports = validateBookMW