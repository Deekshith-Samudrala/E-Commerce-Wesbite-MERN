const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("../project_api/config/routes");
const upload = require("express-fileupload");

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use(upload());
app.use(routes);
app.use(express.static(__dirname+"/assets"));

const port = process.env.PORT || 3001 ;
app.listen(port,()=>{
    console.log("server running with port",port);
});