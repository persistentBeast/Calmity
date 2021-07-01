const express = require('express')
const router = express.Router();
const passport= require('passport');
const user = require('../controllers/user');

router.get('/register', user.renderRegisterForm)

router.post('/register', user.registerUser);

router.get("/login", user.renderLoginForm);

// User login-Logic, Passport gives us a middleware to authenticate the user and we can also pass in our strategy for login
// like whether it is local strategy or login via google, facebook etc. Also we can pass in object for consisting various options that passport provide us

router.post("/login", passport.authenticate('local', {failureFlash : true, failureRedirect : "/user/login"}), user.loginUser)

router.get("/logout", user.logoutUser);

module.exports=router;
