const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
function validation(x){
    if(typeof(x) != "string" || x.trim().length == 0){
        return false
    }
    else{
        return true
    }
}

const createUser = async function(req , res){
    try{
    let userDetails = req.body;
    let {name , email , password} = userDetails;
    if(!name || !email || !password){
        return res.status(400).send({status : false , message : "please provide all the details"})
    }
    if(!validation(name)){
        return res.status(400).send({status : false , message : "Enter name correctly"})
    }
    if(!validation(email)){
        return res.status(400).send({status : false , message : "Enter email correctly"})
    }
    if(!validation(password)){
        return res.status(400).send({status : false , message : "Enter password correctly"})
    }
    let userExist = await userModel.findOne({email : email})
    if(userExist){
        return res.status(400).send({status : false , message : `${email} already exist enter new email id or login via old credential`})
    }

    let user = await userModel.create(userDetails)
    res.status(201).send({status : true , message : user})
    }
    catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}

const login = async function(req , res){
    try{
        let {email , password} = req.body
        let user = await userModel.findOne({email : email , password : password});
        if(!user){
            return res.status(401).send({status : false , message : "email or password is invalid please provide correct details"})
        }

        let token = jwt.sign({
            userId : user._id.toString(),
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 7200
        } , "userstudent");

        res.setHeader("api-key" , token)
        res.status(200).send({status : true , message : user.name , data : token})

    }
    catch(err){
        res.status(500).send({status : false , message : err.message})
    }
}

module.exports = {createUser , login}