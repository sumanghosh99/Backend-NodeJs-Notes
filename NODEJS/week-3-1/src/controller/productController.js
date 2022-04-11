const express = require("express");
const { body, validationResult } = require('express-validator');
const { formatErrors } = require("../utils/validations");
const router = express.Router();
const Product = require("../modules/product.model");
const User = require("../modules/usermodule");

router.get("", async (req, res) => {
    try {
      const products = await Product.find().lean().exec();
  
      return res.send(products);
    } catch (err) {
      return res.status(500).send(err);
    }
});
router.post("",
   body('name')
      .isLength({min:3})
      .withMessage("name is not 3 charecter valid"),
   body("price")
        .notEmpty()
        .withMessage("price is required")
        .custom((value)=>{
            if (value <= 0) {
                throw new Error("Please enter value greater than zero");
              }
            return true;
        }),

async (req, res) => {
    try {
        const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //      const newError=errors.array().map((err)=>{
        //          return {
        //              message:err.msg,
        //              field:err.param
        //          }
        //      })
        //      return res.status(400).json({ errors: newError });
        // }
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: formatErrors(errors.array()) });
        }
      const product = await Product.create(req.body);
  
      return res.send(product);
    } catch (err) {
      return res.status(500).send(err);
    }
});


module.exports =router;