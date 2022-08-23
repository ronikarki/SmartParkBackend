const jwt = require("jsonwebtoken");
const student = require("../models/LibraryModel");

module.exports.verifyStudent = function(req,res, next){

    try{
    const tokens = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(tokens, "anysecretkey");


    // console.log(data);

    student.findOne({_id: data.stdId})
    .then(function(result){
        console.log(result);

        req.studentInfo = result;
        next();
    })

    .catch(function(e){
        res.json({error: "Invalid access" })
    })

    }
    catch(e){
        res.json({error: "Invalid Access"})
    }



}