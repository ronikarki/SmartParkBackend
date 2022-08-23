
const express=require("express");
//const Staff=require("../models/staffModels");
const Admin=require("../models/AdminModel");

const Auth=require("../Auth/Adminauth");
//const Auth=require("../Auth/staffAuth");
const jwt=require("jsonwebtoken");
const bcryptjs=require("bcryptjs");
//const req = require("express/lib/request");
const router=new express.Router();



//route for Admin regestration
router.post("/admin/register",function(req,res){
    const username=req.body.username;
    Admin.findOne({username : username}).then(function(adminData){
        if(adminData!=null){
            res.json({messege:"username already exists!"})
            return;
        }
        //now it mean we r ready to register.
        const password=req.body.password;
        bcryptjs.hash(password,10,function(e,hashed_pw){
            const phone =req.body.phone;
            const address =req.body.address;
            const data=new Admin({
                username:username,
                password:hashed_pw,
                phone: phone,
                address:address
            })
            data.save()
            .then(function(){
                res.json({messege:"Registration done succesfully!!"})
            })
            .catch(function(e){
                res.json(e)
            })
        })
    })
})

//login route-for Admin
router.post("/admin/login",function(req,res){
    const username= req.body.username;
    //select*from staff where username="admin".
    Admin.findOne({username:username})
    .then(function(adminData){
       // console.log(staffData);
        if (adminData==null){
            return res.json({messege:"invalid"})
        }
        //need to check password
        const password =req.body.password;
        bcryptjs.compare(password,adminData.password,function(e,result){
            //true-correct password,false -incorrect password.
            if(result==false){
                return res.json({messege:'invalid!!'})
            }
            // ticket generate-jsonwebtoken
            const token= jwt.sign({aID:adminData._id},"anysecretkey");
            res.json({token:token,messege:"success!!!"});
        })
    })
})

    //to show own /Profile
    router.get("/admin/profile", Auth.verifyAdmin, function(req,res){
        Admin.find().then(function(result){
            console.log(result)
            res.json(result)
        })
        .catch(function(){
            res.json({message : "ok invalid"})
        })
    })




module.exports=router;