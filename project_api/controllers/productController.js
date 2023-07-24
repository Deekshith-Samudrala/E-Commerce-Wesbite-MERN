const app = require("express").Router();
const { Types } = require("mongoose");
const product = require("../models/product");
const path = require("path");
const rand = require("randomstring");


app.get("/",async (req,res)=>{ // get all product data
    let result = await product.find();
    res.send({success : true, info : result})
})

app.get("/cate/:cateid", async (req,res)=>{
    let result = await product.find({category : req.params.cateid});
    res.send({success : true,info : result});
})

app.get("/subcate/:subcateid", async(req,res)=>{
    let result = await product.find({subcategory : req.params.subcateid})
    res.send({succces : true,info : result});
})

app.post("/",async (req,res)=>{ // insert product data 
    let file = req.files.file;
    let formdata = JSON.parse(req.body.data);
    let arr = file.name.split(".")          
    let ext = arr[arr.length - 1]
    let filename = rand.generate()+file.name+"."+ext; 

    formdata.image = filename;

    file.mv(path.resolve()+"/build/assets/Uploads/"+filename, async (err)=>{

        let result = await product.create(formdata);
        res.send({success : true, info : result})
    });
})

app.get("/getone/:pid",async (req,res)=>{
    let result = await product.find({_id : req.params.pid});
    res.send({success : true, info : result});
})

app.delete("/DelId/:id",async (req,res)=>{ // delete product data by id
    let result = await product.deleteMany({_id : req.params.id});
    res.send({success : true,info : result});   
})

app.delete("/DelName/:name",async (req,res)=>{ // delete product data by name
    let result = await product.deleteMany({title : req.params.name});
    res.send({success : true,info : result});   
})

app.put("/:id",async (req,res)=>{ // update product data
    let result = await product.updateMany({_id : req.params.id},req.body);
    res.send({success : true,info : result});
})

app.get("/:cateid/:subcateid",async (req,res)=>{
    let cate = new Types.ObjectId(req.params.cateid);
    let subcate = new Types.ObjectId(req.params.subcateid);
    let result = await product.find({category : cate , subcategory : subcate});
    res.send({success : true,info : result});   
})

module.exports = app;