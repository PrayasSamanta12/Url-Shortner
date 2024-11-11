//const authorizationmap=new Map();
const jwt = require('jsonwebtoken');
const secreatkey = "Prayas123$%";



function setuserid(user) {
    //console.log("Setuserid"+user);
    const payload = {
        _id: user._id,
        email: user.email
    };
    //console.log("User stored in map: ", authorizationmap);
    return jwt.sign(payload, secreatkey);//default algorithm used by jwt is HS256 but we can specify particular algorithm using 3rd argument
}

function getuserid(token) {
    //console.log("Getuserid"+id);
    //return authorizationmap.get(id);
    try {
        return jwt.verify(token, secreatkey);//Verification of token 
    } catch (error) {
        return null;
    }
}
//console.log(authorizationmap);
module.exports = {
    setuserid,
    getuserid,
}