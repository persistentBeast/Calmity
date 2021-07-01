const mongoose= require('mongoose');
const passportLocalMongoose= require('passport-local-mongoose');
const Schema=mongoose.Schema;

const UserSchema = new Schema({
    email : {
        type : String,
        required: true,
        unique : true
    }
});

// This is going to add-on to our schema a username, password and will make sure those usernames are unique, Passport takes 
// care of all these things which we would have had to code explicitly. Also it will provide us some additional methods that we could use.
// The encryptions will also be taken care of.
UserSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model('User', UserSchema);