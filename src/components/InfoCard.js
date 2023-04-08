import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const InfoCard = ({ title, data, keys }) => {
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
  return (
    <Card style={{ width: "30rem" }}>
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
