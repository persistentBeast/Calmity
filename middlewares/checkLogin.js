const isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.flash("error", "You must be Logged In");
        return res.redirect("/user/login");
    }
    next(); // move to other middlewares otherwise;
}

module.exports = isLoggedIn;