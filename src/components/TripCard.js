import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const TripCard = ({ from, passengerVolume, plateNumber, to }) => {
  return (
    <Card style={{ width: "30rem" }}>
      <Card.Body>
        <ListGroup>
          <ListGroup.Item>Form: {from}</ListGroup.Item>
          <ListGroup.Item>To: {to}</ListGroup.Item>
          <ListGroup.Item>Passenger Volume: {passengerVolume}</ListGroup.Item>
          <ListGroup.Item>Plate Number: {plateNumber}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
export default TripCard;
