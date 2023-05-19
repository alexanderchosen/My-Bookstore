const Joi = require('joi')

const AddAuthorValidator = Joi.object({
    firstName: Joi.string()
    .required()
    .min(2)
    .max(255)
    .trim(),

    lastName: Joi.string()
    .min(2)
    .max(255)
    .trim()
    .required(),

    username: Joi.string()
    .min(5)
    .max(255)
    .trim()
    .required(),

    bio: Joi.string()
    .min(10)
    .max(255)
    .trim()
    .required(),

    DOB: Joi.date()
    .min(1900)
    .max(2022),

    country: Joi.string(),
    
    books: Joi.array()
    .items(Joi.string()),

    createdAt: Joi.date()
    .default(Date.now),

    lastUpdatedAt: Joi.date()
    .default(Date.now)
    
})


const UpdateAuthorValidator = Joi.object({
    username: Joi.string()
    .min(5)
    .max(255)
    .trim()
    .required(),

    bio: Joi.string()
    .min(10)
    .max(255)
    .trim()
    .required(),
    
    books: Joi.array()
    .items(Joi.string()),

    lastUpdatedAt: Joi.date()
    .default(Date.now)
    
})


const AddAuthorValidatorMW = async (req, res, next)=>{
    const authorPayload = req.body

    try{
        await AddAuthorValidator.validateAsync(authorPayload)
        next()
    }

    catch(error){
        next({
            status: 404,
            message: error.details[0].message
        })
    }
}

async function UpdateAuthorValidatorMW (req, res, next){
    const authorPayload = req.body

    try{
        await UpdateAuthorValidator.validateAsync(authorPayload)
        next()
    }

    catch(error){
        next({
            status: 404,
            message: error.details[0].message
        })
    }
}


module.exports ={
    AddAuthorValidatorMW,
    UpdateAuthorValidatorMW
}
