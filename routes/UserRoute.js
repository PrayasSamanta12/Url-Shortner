const express=require('express');
const router=express.Router();
const {CreateUser}=require('../controllers/signup')
const {loginUser}=require('../controllers/login');

router.post('/',CreateUser);
router.post('/login',(req,res,next)=>{
    console.log("Hitted");
    next();
},loginUser)

module.exports=router;