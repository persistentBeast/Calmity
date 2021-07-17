const solace=require('../models/solace');
const Review=require('../models/review');
const mapboxgl=require('mapbox-gl')
const mbxGeocoding=require("@mapbox/mapbox-sdk/services/geocoding");
const geocoder=mbxGeocoding({accessToken: process.env.mapBoxAccessToken});

// mapboxgl.accessToken = 'pk.eyJ1IjoiYmJveTk4MDEiLCJhIjoiY2txbXZqeGFrMGhwcjJvcHE4NXlramNwbSJ9._bfCOn2WhAhzpKCnbhiwFA';





module.exports.showAllSolaces = async (req, res, next)=>{
    const solaces= await solace.find({});
    if(!solaces) throw new AppError("Solaces Not Found", 500);
    res.render("solaces/index", {solaces});    
};

module.exports.createNewSolace = async (req, res, next)=>{
    const uploaded_images = req.files; // to add images uploades by use
    
    let images=[];
    for( img of uploaded_images){
        images.push({url : img.path , filename : img.filename})
    }
    let title=req.body.title;
    let location= `${req.body.place}, ${req.body.city}, ${req.body.state}`;
    // getting geoLocation 
    let geoData=await geocoder.forwardGeocode({
        query : location,
        limit : 1
    }).send();
    let geoLocation={ lat: geoData.body.features[0].geometry.coordinates[1], long: geoData.body.features[0].geometry.coordinates[0]};
    let creator = res.locals.user._id;
    const newSolace= new solace({title, location, description: req.body.description, images, creator, geoLocation});
    await newSolace.save();
    req.flash("success", "New Solace Created :)");
    res.redirect("/solaces");
};

module.exports.showSolace = async (req, res, next)=>{
    
    const solaces= await solace.findById(req.params.id).populate('creator').populate({
        path : 'reviews',
        populate : {
            path : 'author'
        }
    });
    if(!solaces) throw new AppError("Solace Not Found", 500);
    res.render("solaces/show", {solaces}); 
    
};

module.exports.renderEditSolaceForm = async (req, res, next)=>{
    const solaces= await solace.findById(req.params.id);
    res.render("solaces/edit", {solaces, mapboxgl});
};

module.exports.editSolace = async (req, res, next)=>{
   
    const title=req.body.title;
    const location= `${req.body.place}, ${req.body.city}, ${req.body.state}`;
    const description=req.body.description;
    await solace.findByIdAndUpdate({_id: req.params.id}, {title: title, location :location, description: description});
    res.redirect(`/solaces/${req.params.id}`);   

};

module.exports.deleteSolace = async (req, res, next)=>{
   
    const solace_id=req.params.id;
    // Deleting the reviews corresponding to the Solace also
    await solace.findByIdAndDelete(solace_id, async (err, doc)=>{
        await Review.deleteMany({_id : { $in : doc.reviews }});
    }).populate('reviews');
    
    res.redirect(`/solaces`);   

};

module.exports.renderNewSolaceForm = (req,res)=>{
    res.render("solaces/new");
};
