const Solace = require("../models/solace");
const AppError = require("../errorhandling/appError");
const Review = require("../models/review");

function catchAsync(func){
    return function(req, res, next){
        func(req, res, next).catch(()=>next(new AppError("Something Went Wrong", 500)));
    }
}



// Check edit, delete authorization of a user on a solace.
const checkAuthorizationOnSolaces = async (req, res, next)=>{
    
    const solace = await Solace.findById(req.params.id).populate("creator");
    if(!solace){
        throw new AppError("No Solace Found !!!", 500);
    }    
    if(!solace.creator._id.equals(res.locals.user._id)){
        req.flash("error", "You can't do that hacker !!!");
        res.redirect(`/solaces/${solace._id}`);
        return;
    }
    next();

}

// Check edit, delete authorization of a user on a review.

const checkAuthorizationOnReviews = catchAsync(async (req, res, next)=>{
    
    const solace = await Solace.findById(req.params.id);
    const review = await Review.findById(req.params.review_id).populate("author");
    if(!review){
        throw new AppError("No Review Found !!!", 500);
    }    
    if(!review.author._id.equals(res.locals.user._id)){
        req.flash("error", "You can't do that !!!");
        res.redirect(`/solaces/${solace._id}`);
        return;
    }
    next();

});



module.exports = {checkAuthorizationOnSolaces, checkAuthorizationOnReviews};