//var mongoose = require('mongoose');
module.exports = app => {
    var router = require("express").Router();
    
    router.get("/checkDBConnection",(req,res)=>{
        res.json({message:" db connection status :"})
        //res.json({message:" db connection status :"+mongoose.connection.readyState})
    });
}