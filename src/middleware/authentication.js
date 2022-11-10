const jwt = require("jsonwebtoken");

async function authenticate(req , res , next){
    try{
    let token = req.headers["api-key"]
    if(!token){
        return res.status(401).send({status : false , message : "provide credential"})
    }

    let decodedToken = jwt.verify(token, "userstudent" , ((err , verified)=> {
        if(err) return false
        if(verified) return verified
      }));
      if (!decodedToken) {
        return res.status(403).send({ status: false, message: "token is invalid" });
      }

    let userId = decodedToken.userId
    req.userId = userId
    next();
    }
    catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}

module.exports = authenticate