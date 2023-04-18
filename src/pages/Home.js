import CardComponent from "../components/CardComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  return (
    <Container
      style={{ height: "40rem", width: "40rem" }}
      className="d-flex justify-content-center align-items-center"
    >
      <CardComponent />
    </Container>
  );
};
export default Home;
