const joi = require('joi');

const solace_schema = joi.object(
    {
        title : joi.string()
            .min(3)
            .max(30)
            .required(),
        description : joi.string()
            .min(10)
            .max(50)
            .required(),
        place : joi.string()
            .required(),
        city : joi.string()
            .required(),    
        state : joi.string()
            .required(),
        
    }
)


const review_schema = joi.object(
    {
        review : joi.string()
            .required(),
        rating : joi.number()
            .min(1)
            .max(5)
            .required()
    }
)

module.exports = {review_schema, solace_schema};