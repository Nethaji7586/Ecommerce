"use client"

import { Row, Col, ListGroup, Image, Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout")
    } else {
      navigate("/login")
    }
  }

  if (items.length === 0) {
    return (
      <Row>
        <Col>
          <Alert variant="info">
            Your cart is empty. <Link to="/">Go Shopping</Link>
          </Alert>
        </Col>
      </Row>
    )
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        <ListGroup variant="flush">
          {items.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col md={2}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fluid
                    rounded
                    className="cart-item-image"
                  />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button type="button" variant="light" onClick={() => removeFromCart(item._id)}>
                    Remove
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({items.reduce((acc, item) => acc + item.qty, 0)}) items</h2>${getCartTotal().toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="w-100" disabled={items.length === 0} onClick={handleCheckout}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Cart
