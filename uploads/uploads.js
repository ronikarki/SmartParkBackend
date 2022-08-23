const multer = require("multer");


//file upload
 const storage = multer.diskStorage({
     destination: function(req, file, cb){
         cb(null, './books')

     },
     filename: function(req,file,cb){
         cb(null, "ram.jpg")
     }
 })


 const upload = multer({
     storage: storage
 })

 module.exports = upload;


