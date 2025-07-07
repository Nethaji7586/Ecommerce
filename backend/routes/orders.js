const express = require("express")
const Order = require("../models/Order")
const auth = require("../middleware/auth")

const router = express.Router()

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: "No order items" })
      return
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get("/myorders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (order) {
      res.json(order)
    } else {
      res.status(404).json({ message: "Order not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
