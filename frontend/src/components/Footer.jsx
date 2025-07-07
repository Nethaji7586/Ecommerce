import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light mt-5">
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>&copy; 2024 E-Commerce Store. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
