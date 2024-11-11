//If not uuid cookies present in request go to login page
async function checkuuidhomepage(req,res,next) {
    if(!req.cookies?.uuid){
        return res.render('login');
    }
    next();
}

module.exports={
    checkuuidhomepage,
}