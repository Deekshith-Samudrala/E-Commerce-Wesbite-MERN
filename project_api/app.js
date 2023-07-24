require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./config/routes");
const upload = require("express-fileupload");
const root = require("path").join(__dirname,"build");
const uploadpath = require("path").join(__dirname,"Uploads");

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use(upload());
app.use(express.static(uploadpath));
app.use(routes);
app.use(express.static(root));

app.use("*",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

const port = process.env.PORT || 3001 ;
app.listen(port,()=>{
    console.log("server running with port",port);
});