const {getuserid}=require('../services/autherization')
async function CheckloggeduserId(req,res,next) {
    const uniqueid=req.cookies.uuid;
    console.log(req.originalUrl);
    if(!uniqueid){
        console.log("fisrt if")
        return res.render('login');
    }
    console.log(uniqueid);
    console.log("Cuurent User"+getuserid(uniqueid));
    const getcurrentuser=getuserid(uniqueid);
    console.log(getcurrentuser);
    //if token is not valid then do this
    if(!getcurrentuser){
        console.log("Second if")
        return res.render('login');
    }
    req.user=getcurrentuser;
    //console.log(getcurrentuser);
    next();
}
module.exports={
    CheckloggeduserId,
}
//bef45d7a-5608-48e8-b696-c25bf25f5f1f