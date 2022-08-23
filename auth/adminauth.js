const jwt=require("jsonwebtoken");
const Admin=require("../models/AdminModel");
//const Staff=require("../models/staffModels");
module.exports.verifyAdmin=function(req,res,next){  
    
    try{
    //console.log("Data Reached here");
    const tokens =req.headers.authorization.split(" ")[1];
    const data=jwt.verify(tokens,"anysecretkey");
    //console.log(data);
    //console.log(token);
    Admin.findOne({_id:data.aID})
    .then(function(result){
        //console.log(result);
        req.adminInfo=result;
        next();
    })
    .catch(function(e){
        res.json({error:e})
    })
    }
    catch (e){
        res.json({error: "invalid Access"})
    }
}