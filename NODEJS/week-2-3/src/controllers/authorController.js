const express=require("express");
const Author=require("../modules/authors.module");
const router=express.Router();

router.get("",async (req,res)=>{
    try {
        const authors= await Author.find().populate({path:"books_ids",select:{name:1}}).lean().exec();
        return res.send(authors);
    } catch (err) {
       return res.status(500).json({error:err.message}); 
    }
});

router.post("",async (req,res)=>{
    try {
        const authors= await  Author.create(req.body);
        return res.status(201).send(authors);
    } catch (err) {
       return res.status(500).send(err.message); 
    }
});

router.get("/:id",async (req,res)=>{
    try {
        const authors= await Author.findById(req.params.id).populate({path:"books_ids",select:{name:1}}).lean().exec();
        return res.send(authors);
    } catch (err) {
       return res.status(500).json({error:err.message}); 
    }
});

router.patch("/:id", async (req, res) => {
    try {
      const authors = await Author.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      return res.status(200).send(authors);
    } catch (err) {
      return res.status(500).send(err.message);
    }
});


router.delete("/:id", async (req, res) => {
    try {
      const authors = await Author.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(authors);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

module.exports = router;