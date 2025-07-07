"use client"

import { Navbar, Nav, Container, Badge } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const { getCartItemsCount } = useCart()

  const handleLogout = () => {
    logout()
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>E-Commerce Store</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                Cart{" "}
                {getCartItemsCount() > 0 && (
                  <Badge bg="primary" className="ms-1">
                    {getCartItemsCount()}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {isAuthenticated ? (
              <>
                <LinkContainer to="/orders">
                  <Nav.Link>My Orders</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout ({user?.name})</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
