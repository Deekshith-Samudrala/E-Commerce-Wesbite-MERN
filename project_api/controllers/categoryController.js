const app = require("express").Router();
const category = require("../models/category");

app.get("/",async (req,res)=>{ // get all category data
    let result = await category.find();
    res.send({success : true, info : result})
})

app.post("/",async (req,res)=>{ // insert category data 
    let result = await category.create(req.body);
    res.send({success : true, info : result})
})

app.delete("/:id",async (req,res)=>{ // delete category data
    let result = await category.deleteMany({_id : req.params.id});
    res.send({success : true,info : result});
})

app.put("/:id",async (req,res)=>{ // update category data
    let result = await category.updateMany({_id : req.params.id},req.body);
    res.send({success : true,info : result});
})

app.post("/subcategory",async (req,res)=>{ // insert a subcategory into that category
    let result = await category.updateOne({name : req.body.category},{$push : {subcategory : {name : req.body.name}}})
    res.send({success : true, info : result})
})

app.get("/:cateid",async(req,res)=>{// get details of a category
    let result = await category.find({_id : req.params.cateid })
    res.send({success : true,info : result})
})

app.get("/subcategory/:cateid/:subcateid", async(req,res)=>{
    let cid = req.params.cateid;
    let sid = req.params.subcateid
    let result = await category.findOne(
        { _id: cid, "subcategory._id": sid },
        { "subcategory.$": 1 }
      );;
    res.send({success : true,info : result});
})

app.put("/subcategory/:cateid/:subcateid", async(req,res)=>{
    let result = await category.updateOne(
        { _id: req.params.cateid, "subcategory._id": req.params.subcateid },
        { $set: { "subcategory.$.name": req.body.name } }
      );
    res.send({success : true,info : result});
})

app.delete("/subcategory/:cid/:sid", async (req,res)=>{
    let result = await category.findOneAndUpdate(
        { _id : req.params.cid },
        { $pull : { subcategory : { _id : req.params.sid }}}
        )
    res.send({success : true,info : result});
})

app.delete("/subcategory"), async (req,res)=>{}

module.exports = app;