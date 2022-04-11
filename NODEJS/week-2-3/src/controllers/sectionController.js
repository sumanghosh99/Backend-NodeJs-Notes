const express=require("express");
const Section=require("../modules/section.module");
const router=express.Router();


router.get("",async (req,res)=>{
    try {
        const sections= await Section.find().lean().exec();
        return res.send(sections);
    } catch (err) {
       return res.status(500).json({error:err.message}); 
    }
});

router.post("",async (req,res)=>{
    try {
        const sections= await  Section.create(req.body);
        return res.status(201).send(sections);
    } catch (err) {
       return res.status(500).send(err.message); 
    }
});

router.get("/:id", async (req, res) => {
    try {
      const sections = await  Section.findById(req.params.id).lean().exec();
  
      return res.status(200).send(sections);
    } catch (err) {
      return res.status(500).send(err.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
      const sections = await  Section.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();
  
      return res.status(200).send(sections);
    } catch (err) {
      return res.status(500).send(err.message);
    }
});
router.delete("/:id", async (req, res) => {
    try {
      const sections = await  Section.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(sections);
    } catch (err) {
      return res.status(500).send(err.message);
    }
});

module.exports= router;