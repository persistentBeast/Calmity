const express = require('express');
const router = express.Router();
const AppError = require("../errorhandling/appError");
const {review_schema} = require('../schema');
const isLoggedIn = require('../middlewares/checkLogin');
const {checkAuthorizationOnReviews} = require('../middlewares/checkAuthorization');
const review = require('../controllers/review');

function catchAsync(func){
    return function(req, res, next){
        func(req, res, next).catch(()=>next(new AppError("Something Went Wrong", 500)));
    }
}

// Review Schema Validation
const validateReviewSchema=(req, res, next)=>{
    const result=review_schema.validate(req.body);
    if(result.error){
        const msg=result.error.details.map((e)=>e.message).join(", ");
        throw new AppError(msg, 400);
    }else{
        next(); // very important in order to continue with next route callbacks
    }    
}


//Adding Review to a solace

router.post("/:id/reviews", isLoggedIn ,validateReviewSchema, catchAsync(review.postReview));

// Deleting Review

router.delete("/:id/reviews/:review_id", isLoggedIn , checkAuthorizationOnReviews, catchAsync(review.deleteReview));

module.exports = router;
