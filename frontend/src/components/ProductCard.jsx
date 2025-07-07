"use client"

import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <Card className="h-100 product-card">
      <Card.Img variant="top" src={product.image} className="product-image" alt={product.name} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="flex-grow-1">{product.description.substring(0, 100)}...</Card.Text>
        <div className="mb-2">
          <span className="rating">
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
          </span>
          <small className="text-muted ms-2">({product.numReviews} reviews)</small>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="text-primary mb-0">${product.price}</h5>
          <div>
            <Link to={`/product/${product._id}`} className="btn btn-outline-primary btn-sm me-2">
              View
            </Link>
            <Button variant="primary" size="sm" onClick={handleAddToCart} disabled={product.countInStock === 0}>
              {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
