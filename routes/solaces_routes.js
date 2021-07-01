const express = require('express')
const router = express.Router();
const {solace_schema} = require('../schema');
const AppError = require("../errorhandling/appError");
const isLoggedIn = require('../middlewares/checkLogin');
const {checkAuthorizationOnSolaces} = require("../middlewares/checkAuthorization");
const solace = require('../controllers/solace');
const multer = require('multer');

// for storing images to cloudinary
const {storage} = require('../cloudinary/index');
var upload = multer({storage});



function catchAsync(func){
    return function(req, res, next){
        func(req, res, next).catch(()=>next(new AppError("Something Went Wrong", 500)));
    }
}

// JoI Schema Validation while creating a new solace
// JOI schema validation middleware
const validate_schema=(req, res, next)=>{
    const result=solace_schema.validate(req.body);
    if(result.error){
        const msg=result.error.details.map((e)=>e.message).join(", ");
        throw new AppError(msg, 400);
    }else{
        next(); // very important in order to continue with next route callbacks
    }    
}

router.get("/", catchAsync(solace.showAllSolaces));

router.post("/", isLoggedIn , upload.array('test') ,validate_schema , catchAsync(solace.createNewSolace));

router.get("/new", isLoggedIn , solace.renderNewSolaceForm);

router.get("/:id", catchAsync(solace.showSolace));

router.get("/edit/:id", isLoggedIn , checkAuthorizationOnSolaces, catchAsync(solace.renderEditSolaceForm));

router.put("/:id", isLoggedIn ,validate_schema, checkAuthorizationOnSolaces ,catchAsync(solace.editSolace));

router.delete("/:id", isLoggedIn , checkAuthorizationOnSolaces ,catchAsync(solace.deleteSolace));

module.exports = router;