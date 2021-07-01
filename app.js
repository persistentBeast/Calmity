if(process.env.NODE_ENV !== "production" ){
    require('dotenv').config();
}

const express=require("express");
const app=express();
const path= require('path');
const mongoose= require('mongoose');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const session = require('express-session');
const flash=require('connect-flash');
const passport= require('passport');
const passportLocal= require('passport-local');
const User = require("./models/user");
const solace_routes = require("./routes/solaces_routes");
const review_routes = require("./routes/reviews");
const user_routes = require("./routes/user");

// const { findByIdAndDelete } = require("./models/solace");


mongoose.connect('mongodb://localhost:27017/calmity', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db=mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
});

// Managing Sessions

const sessionConfig = {
    secret : 'abhu1998',
    resave : false,
    saveUninitialized : true,

    // setting cookie object
    cookie : {
        // For security
        httpOnly : true,
        // Say to expire in a week, Date.now() gives date in millisecinds
        expires :  Date.now() + 1000 * 60 * 60 * 24 * 7, 
        maxAge :  1000 * 60 * 60 * 24 * 7
    }

}

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static('static'));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.use(session(sessionConfig)); 
app.use(flash());
app.use(passport.initialize()); // middleware to initialize Passport 
app.use(passport.session()); // middleware to use persistent login sessions, Must be after app.use(session("..."))
passport.use(new passportLocal(User.authenticate())); // .authenticate and other methods are added by passport-local mongoose to our User model
passport.serializeUser(User.serializeUser()); // How store user in the session, added by passport-local mongoose to our User model
passport.deserializeUser(User.deserializeUser()); // How unn-store user in the session, added by passport-local mongoose to our User model



// Setting up middleware for Flash messages and binding to res.locals so that we don't have to render them in a view everytime
// Adding information to res.locals so that required information can be made available to all views when required.
app.use((req, res, next) =>{
    res.locals.user=req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next(); // To move to next route handlers

})

// Routes
app.use("/solaces", review_routes);
app.use("/solaces", solace_routes);
app.use("/user", user_routes);


app.use((err, req, res, next)=>{
    res.render('errors/error', {err});
})

app.listen(8000, ()=>{
    console.log("Its Live");
})
