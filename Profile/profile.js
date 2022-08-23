const express =require("express");
const Staff=require("../models/staffModels");
const auth=require("../Auth/Adminauth");
const req = require("express/lib/request");


//const Admin=require("../models/AdminModel");
const router =new express.Router();




 //to show  Staff/Profile by admin
 router.get("/staff/profile", auth.verifyAdmin, function(req,res){
    
    Staff.find().then(function(result){
        console.log(result)
        res.json(result)
    })
    .catch(function(){
        res.json({message : "ok invalid"})
    })
})

// customer delete by admin

router.delete("/staff/delete", function (req,res) {
    console.log("Data reached");
    //const id =req.adminInfo._id;
    //const id =req.staffInfo._id;
    const StID=req.body.StID;
    Staff.deleteOne({_id :StID})
     .then(function(){
         res.json({msg:"Deleted"})

     })
     .catch(function(){
         res.json({msg:"Try Again"})
     })

   


})

module.exports=router;