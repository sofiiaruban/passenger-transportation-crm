import CardComponent from "../components/CardComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  return (
    <Container className="d-flex justify-content-center">
      <Row>
        <Col>
          <CardComponent />
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
