const mongoose = require('mongoose');

const schema=mongoose.Schema;

const review = new schema ({
    body : String,
    peaceIndex: Number,
    author : {
        type : schema.Types.ObjectId, ref : 'User'
    }
})

module.exports=mongoose.model("Review", review);