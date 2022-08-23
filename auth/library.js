const jwt=require("jsonwebtoken");
const Staff=require("../models/staffModels");
module.exports.verifyStaff=function(req,res,next){  
    
    try{
    const tokens =req.headers.authorization.split(" ")[1];
    const data=jwt.verify(tokens,"anysecretkey");
    //console.log(data);
    //console.log(token);
    Staff.findOne({_id:data.StID})
    .then(function(result){
        //console.log(result);
        req.staffInfo=result;
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