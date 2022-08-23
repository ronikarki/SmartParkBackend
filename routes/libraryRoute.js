const mongoose = require("mongoose");
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const library = require("../models/LibraryModel");
const auth = require("../auth/auth");
const { route } = require("express/lib/application");
const upload = require("../uploads/uploads");

const router = new express.Router();

//route for customer registration
router.post("/library/register", function(req,res){
    const username = req.body.username;
    library.findOne({username : username}).then(function(ldata){
        if(ldata != null){
            res.json({message: "Registration!"})
            return;
        }

        //now it means we are ready for registration
        const password = req.body.password;
        bcryptjs.hash(password, 10,function(e,hashed_pw){
            const phone = req.body.phone;
            const address = req.body.address;   
            const ldata = new library({
                username: username,
                password: hashed_pw,
                phone: phone,
                address: address
            })
            ldata.save()
            .then(function(hello){
                console.log(hello)
                res.status(200).json({success: true})
            })
            .catch(function(e){
                res.json(e)
            })
        })
    })

})

//login route for student 
router.post("/library/login", function(req,res){
    const username = req.body.username;
    //selet * from student where username = 'admin'
    library.findOne({username: username})
    .then(function(sdata){
        //console.log(sdata);
        if (sdata== null){
            return res.json({success: true})
        }

        //meed to check password
        const password = req.body.password;
        bcryptjs.compare(password, sdata.password ,function(e,result){
            //true -correct pw, false- incorrect pw
            if (result== false){
                return res.json({success: true})
            }
            // ticket generate -jsonwebtoken

            const token = jwt.sign({stdId: sdata._id}, "anysecretkey");
            res.json({token: token, success: true});


        })  
        
    })
})

//student profile update 

router.put("/library/profile/update",auth.verifyStudent,function(req,res){
    //console.log(req.studentInfo);
    const id = req.studentInfo._id;
    const phone = req.body.phone;
    const address = req.body.address;
    library.updateOne({_id: id},{phone: phone}).then(function(){
        res.json({message: "Updated Successfully!"})
    }).catch(function(){
        res.json({message:"Try Again!"})
    })
})

router.delete("/library/delete", auth.verifyStudent, function(req,res){
    res.json({id: req.studentInfo.phone});

})

router.put("/library/update", auth.verifyStudent, function(req,res){

})

router.post("/news/upload", upload.single('ab_cd'), function(req, res){
    console.log(req.file);
})






module.exports = router;