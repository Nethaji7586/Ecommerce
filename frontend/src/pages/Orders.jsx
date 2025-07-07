"use client"

import { useState, useEffect } from "react"
import { Table, Alert, Spinner, Badge } from "react-bootstrap"
import axios from "axios"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/myorders`)
        setOrders(response.data)
      } catch (error) {
        setError("Failed to fetch orders")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  if (orders.length === 0) {
    return <Alert variant="info">You have no orders yet.</Alert>
  }

  return (
    <>
      <h1>My Orders</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  <Badge bg="success">{new Date(order.paidAt).toLocaleDateString()}</Badge>
                ) : (
                  <Badge bg="danger">Not Paid</Badge>
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  <Badge bg="success">{new Date(order.deliveredAt).toLocaleDateString()}</Badge>
                ) : (
                  <Badge bg="warning">Not Delivered</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Orders
