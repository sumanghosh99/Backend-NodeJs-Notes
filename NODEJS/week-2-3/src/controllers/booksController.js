const express=require("express");
const Book=require("../modules/books.module");
const router=express.Router();

router.get("",async (req,res)=>{
    try {
        const books= await Book.find().populate({path:"section_id",select:{name:1}}).lean().exec();
        return res.send(books);
    } catch (err) {
       return res.status(500).json({error:err.message}); 
    }
});

router.post("",async (req,res)=>{
    try {
        const books= await  Book.create(req.body);
        return res.status(201).send(books);
    } catch (err) {
       return res.status(500).send(err.message); 
    }
});

router.get("/:id",async (req,res)=>{
    try {
        const books= await Book.findById(req.params.id).populate({path:"section_id",select:{name:1}}).lean().exec();
        return res.send(books);
    } catch (err) {
       return res.status(500).json({error:err.message}); 
    }
});

router.patch("/:id", async (req, res) => {
    try {
      const books = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      return res.status(200).send(books);
    } catch (err) {
      return res.status(500).send(err.message);
    }
});
router.delete("/:id", async (req, res) => {
    try {
      const books = await Book.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.status(200).send(books);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

module.exports =router;