const express = require("express");
const { body, validationResult } = require("express-validator");

const { formatErrors } = require("../utils/validations");

const router = express.Router();

const Product = require("../models/product.model");
const User = require("../models/user.model");

router.get("", async (req, res) => {
  try {
    const products = await Product.find().lean().exec();

    return res.send(products);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post(
  "",
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name is required and must be at least 3 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("Please enter value greater than zero");
      }
      return true;
    }),
  body("user_id")
    .notEmpty()
    .withMessage("User Id is required")
    .custom(async (value) => {
      try {
        const user = await User.findById(value).lean().exec();
        if (!user) return Promise.reject("User does not exist");
        return true;
      } catch (err) {
        console.log(err.message);
      }
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: formatErrors(errors.array()) });
      }

      const product = await Product.create(req.body);

      return res.send({ product });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

router.patch(
  "/:id",
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name is required and must be at least 3 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("Please enter value greater than zero");
      }
      return true;
    }),
  body("user_id")
    .notEmpty()
    .withMessage("User Id is required")
    .custom(async (value, { req }) => {
      return await validateIfUserCreatedProduct(value, req);
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: formatErrors(errors.array()) });
      }

      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      return res.send({ product });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

const validateIfUserCreatedProduct = async (value, req) => {
  try {
    // Only the user who created the product can update the product
    const user = await User.findById(value).lean().exec();
    if (!user) return Promise.reject("User does not exist");

    const product = await Product.findById(req.params.id).lean().exec();
    if (!product) return Promise.reject("Product does not exist");
    if (!product.user_id.equals(user._id))
      return Promise.reject("This user is not allowed to update the product");
    return true;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = router;
