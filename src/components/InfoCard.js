import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import EditIcon from "../assets/EditIcon";

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
    <Card className="mb-3">
      <Card.Body>
        <EditIcon />
        <ListGroup className="mt-3">
          {keys.map((key) => (
            <ListGroup.Item key={key}>
              <b>{prepareKey(key)}:</b> {data[key]}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
export default InfoCard;
