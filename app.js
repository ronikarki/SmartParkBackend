const express = require("express");
const library = require("./models/LibraryModel");
const app= express();



app.use(express.json());
app.use(express.urlencoded({extended: true}));

require("./database/db");
const libraryRoute = require("../assignment/routes/libraryRoute");
app.use(libraryRoute);
app.listen(90);