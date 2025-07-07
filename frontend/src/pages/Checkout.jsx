"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button, Row, Col, Card, ListGroup, Alert } from "react-bootstrap"
import axios from "axios"
import { useCart } from "../context/CartContext"

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("PayPal")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const orderItems = items.map((item) => ({
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: item._id,
      }))

      const itemsPrice = getCartTotal()
      const shippingPrice = itemsPrice > 100 ? 0 : 10
      const taxPrice = Number((0.15 * itemsPrice).toFixed(2))
      const totalPrice = itemsPrice + shippingPrice + taxPrice

      const orderData = {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData)

      clearCart()
      navigate("/orders")
    } catch (error) {
      setError(error.response?.data?.message || "Failed to place order")
    } finally {
      setLoading(false)
    }
  }

  const itemsPrice = getCartTotal()
  const shippingPrice = itemsPrice > 100 ? 0 : 10
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2))
  const totalPrice = itemsPrice + shippingPrice + taxPrice

  return (
    <Row>
      <Col md={8}>
        <h1>Checkout</h1>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <h2>Shipping Address</h2>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={shippingAddress.address}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" value={shippingAddress.city} onChange={handleInputChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              value={shippingAddress.postalCode}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={shippingAddress.country}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <h2>Payment Method</h2>
          <Form.Group className="mb-3">
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </Form>
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${itemsPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${shippingPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${taxPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${totalPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Checkout
