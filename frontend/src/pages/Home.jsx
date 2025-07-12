"use client"

import { useState, useEffect } from "react"
import { Row, Col, Alert, Spinner, Container } from "react-bootstrap"
import axios from "axios"
import ProductCard from "../components/ProductCard"

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`)
        console.log("API Response:", response.data)

        const data = response.data
        const productsArray = Array.isArray(data) ? data : data.products

        if (!Array.isArray(productsArray)) {
          throw new Error("Invalid data format: expected an array of products")
        }

        setProducts(productsArray)
      } catch (err) {
        console.error("Fetch error:", err)
        setError(err.response?.data?.message || "Service paused by nethaji")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Home
