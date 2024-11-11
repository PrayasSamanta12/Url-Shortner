const express = require('express');
const Router=express.Router();
const {getuserid}=require('../services/autherization');
const URL=require('../models/url')

//Root url is used to send index.ejs
Router.get('/',async (req,res)=>{
    try {
        if(!req.cookies.uuid){
            console.log("inside if req.user"+req.user);
            return res.render('login');
        }
        req.user=getuserid(req.cookies.uuid);
        if(!req.user){
          console.log("Second if req.user"+req.user);
          return res.render('login');
        }
        const CurrentuserUrls = await URL.find({ createdby:req.user._id }); // Fetch all the URLs of that user from the database
        if(!CurrentuserUrls) return res.render('login');
        console.log(CurrentuserUrls);
        const urlData = CurrentuserUrls.map((data, index) => ({
          slotnot: index + 1,
          shortID: data.shortId,
          Urlentered: data.redirectURL,
        }));
        //console.log(urlData);
        // Render all URLs at once and pass the data to the EJS template
        res.render('index', { urls: urlData });
      } catch (error) {
        console.error('Error fetching URLs:', error);
        res.status(500).send('Server Error');
      }
})
//Route for sign up page
Router.get('/signup',(req,res)=>{
    return res.render('signup');
})
//Route for login page
Router.get('/login',(req,res)=>{
    return res.render('login')
})

module.exports=Router;