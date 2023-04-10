import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const prepareKey = (str) => {
  let preparedKey = str.charAt(0).toUpperCase();
  let length = str.length;
  for (let i = 1; i < length; i++) {
    if (str[i] !== str[i].toUpperCase()) {
      preparedKey += str[i];
    } else {
      preparedKey += " " + str[i];
    }
  }
  return preparedKey;
};

const InfoCard = ({ data, keys }) => {
  return (
    <Card style={{ width: "30rem" }} className="mb-3">
      <Card.Body>
        <ListGroup>
          {keys.map((key) => (
            <ListGroup.Item key={key}>{`${prepareKey(key)}: ${
              data[key]
            }`}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
export default InfoCard;
