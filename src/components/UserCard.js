import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const UserCard = ({ name, surname, role }) => {
  return (
    <Card style={{ width: "30rem" }}>
      <Card.Body>
        <ListGroup>
          <ListGroup.Item>Name: {name}</ListGroup.Item>
          <ListGroup.Item>Surname: {surname}</ListGroup.Item>
          <ListGroup.Item>Role: {role}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
export default UserCard;
