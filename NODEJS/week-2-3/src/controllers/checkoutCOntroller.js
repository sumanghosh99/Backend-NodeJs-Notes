const express=require("express");
const Checkout=require("../modules/checkout.module");
const router=express.Router();

router.get("",async (req,res)=>{
    try {
        const checkout= await Checkout.find().populate({path:"book_id",select:{name:1,section_id:1}}).populate({path:"user_id",select:{first_name:1}}).lean().exec();
        return res.send(checkout);
    } catch (err) {
       return res.status(500).json({error:err.message}); 
    }
});

router.post("",async (req,res)=>{
    try {
        const checkout= await  Checkout.create(req.body);
        return res.status(201).send(checkout);
    } catch (err) {
       return res.status(500).send(err.message); 
    }
});

router.get("/:id",async (req,res)=>{
    try {
        const checkout= await Checkout.findById(req.params.id).populate({path:"book_id",select:{name:1,section_id:1}}).populate({path:"user_id",select:{first_name:1}}).lean().exec();
        return res.send(checkout);
    } catch (err) {
       return res.status(500).json({error:err.message}); 
    }
});

router.patch("/:id", async (req, res) => {
    try {
      const checkouts = await Checkout.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      return res.status(200).send(checkouts);
    } catch (err) {
      return res.status(500).send(err.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
      const checkouts = await Checkout.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(checkouts);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

module.exports =router;