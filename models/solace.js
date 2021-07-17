const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const SolaceSchema=new Schema({
    title: String,
    description : String,
    location : String,
    geoLocation : {
        lat : Number,
        long : Number,
    },    
    images: [
        {
            url : String,
            filename : String
        }
    ], 
    creator : {
        type : Schema.Types.ObjectId, ref : "User"
    },
    reviews: [
        {
            type : Schema.Types.ObjectId, ref : "Review"
        }
    ]

})

module.exports=mongoose.model('Solace', SolaceSchema);
