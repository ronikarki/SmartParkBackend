const mongoose = require("mongoose");
const library = mongoose.model('Library',{
    username : {
        type: String    
    },
    password : {
        type : String
    },
    phone : {
        type: String
    },
    address : {
        type: String
    }
    
})

module.exports = library;