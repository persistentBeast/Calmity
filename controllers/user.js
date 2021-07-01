const User = require("../models/user");
const AppError = require("../errorhandling/appError");


module.exports.registerUser = async (req, res, next)=>{
    try{
        const {username, email, password} = req.body;
        const new_user = new User( {username, email} );
        const if_email_exist = await User.count(({email})) ;
        if(if_email_exist){
            throw new AppError("Email already exists !!");
        }
        await User.register(new_user, password);
        req.flash("success", "User Succesfully Registered !!");
        res.redirect("/user/login");
    }catch(err){
        req.flash("error", err.message );
        res.redirect("/user/register");

    }


};

module.exports.loginUser = (req, res)=>{
    req.flash("success", "Welcome Back.");
    res.redirect("/solaces");
};

module.exports.logoutUser = (req, res, next)=>{
    req.logout();
    req.flash("success", "You are succesfully logged out.");    
    res.redirect("/solaces");
};

module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login");
};

module.exports.renderRegisterForm = (req, res)=>{
    res.render("users/register");
};




