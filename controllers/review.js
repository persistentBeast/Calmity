const Review=require('../models/review');
const solace=require('../models/solace');

module.exports.postReview = async(req, res, next)=>{
    const author = req.user;
    const {rating, review} = req.body;
    const solaces=await solace.findById(req.params.id);
    const new_review=new Review({body: review, peaceIndex: rating, author});
    await new_review.save();
    solaces.reviews.push(new_review);
    await solaces.save();    
    res.redirect(`/solaces/${req.params.id}`);
};

module.exports.deleteReview = async (req, res, next)=>{
    
    const solace_id=req.params.id;
    const review_id=req.params.review_id;
    const solaces=await solace.findById(solace_id).populate('reviews');
    let i;
    for(i=0;i<solaces.reviews.length;i++){
        if(solaces.reviews[i]["_id"]===review_id){
            break;            
        }
    }
    solaces.reviews.splice(i,1);
    await solace.findByIdAndUpdate(solace_id, {reviews : solaces.reviews});
    await Review.findByIdAndDelete(review_id);  
    res.redirect(`/solaces/${solace_id}`);   

};