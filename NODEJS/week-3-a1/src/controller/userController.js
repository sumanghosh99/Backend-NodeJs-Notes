const express = require("express");
const router=express.Router();
const User=require("../models/user.model");
const { body, validationResult } = require('express-validator');

router.get("",async(req,res)=>{
    try {
        const users= await User.find().lean().exec();
        return res.send(users);
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.post("",
body('email').isEmail().withMessage("enter valid email"),
body("pincode").isLength({min:6}).withMessage("length should be 6"),
body("age").notEmpty().withMessage("age is require").custom((value)=>{
    if(value<0 || value>100){
        throw new Error("please enter value between 1 to 100");
    }
    return true;
}),
body("gender").notEmpty().withMessage("age is require").custom((value)=>{
    if(value =="Male" || value =="Female" || value=="Others"){
        return true;
    }else{
        throw new Error("should be either Male, Female or Others");
    }
}),
async(req,res)=>{  
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const newError=errors.array().map((err)=>{
                return {
                    message:err.msg,
                    field:err.param
                }
            })
            return res.status(400).json({ errors: newError });
        }
        const user= await User.create(req.body);
        return res.status(201).send(user);
    } catch (err) {
        return res.status(500).send(err);
    }
})



module.exports=router;