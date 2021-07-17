const express=require("express");
const app=express();
const path= require('path');
const mongoose= require('mongoose');
const solace=require('../models/solace');
const User=require('../models/user');
const reviews = require('../models/review');



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


const seedDB=async()=>{
    await solace.deleteMany({});
    await reviews.deleteMany({});
    await User.deleteMany({});
    // const placesPrefix=[ "Dusty", "Peaceful", "Charming", "Quiet", "Warm", "Nirvana", "Lovely", "Mesmerizing", "YOLO"];
    // const placesSuffix=["Street", "Lane", "Cafe", "View", "Backyard", "Place", "Park", "Garden", "Orchard"];
    // const Places=["Mayur Vihar", "Green-Park", "Hauz-Khas", "Rohini", "Downtown", "Town", "Gurgaon", "Queens-Park", "Def-Col", "G-K"]
    // const locations=[["Delhi","Delhi"],["Pune","Maharashtra"],["Bangalore","Karnatake"],["Hyderabad", "Telangana"],["Mumbai","Maharashtra"],["Dehradun","UK"],["Agra","UP"],["Panaji","Goa"],["Surat","Gujrat"]];
    // const users = await User.find({});
    // let title,place,city,state,image,description,creator;
    // for(let i=0;i<=20;i++){
        
    //     title=placesPrefix[Math.floor(Math.random() * placesPrefix.length)]+" "+placesSuffix[Math.floor(Math.random() * placesSuffix.length)];
    //     place=Places[Math.floor(Math.random() * Places.length)];
    //     city=locations[Math.floor(Math.random() * locations.length)][0];
    //     state=locations[Math.floor(Math.random() * locations.length)][1];
    //     image="https://source.unsplash.com/featured/?woods";
    //     description="What a Solace !!!";
    //     creator = users[Math.floor(Math.random() * users.length)]._id;
    //     let solaces=new solace({title: title, location: place+", " +city+', '+state, image:image, description: description , creator : creator});
    //     await solaces.save();
    // }
}

seedDB();





