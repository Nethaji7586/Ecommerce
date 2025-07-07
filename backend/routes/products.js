const express = require("express")
const Product = require("../models/Product")

const router = express.Router()

// @route   GET /api/products
// @desc    Fetch all products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/products/:id
// @desc    Fetch single product
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
