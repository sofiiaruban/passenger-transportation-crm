import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { query, getDocs } from "firebase/firestore";
import InfoCard from "../components/InfoCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const getData = async (collectionName, setState) => {
      const q = query(collection(db, collectionName));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setState((prev) => [...prev, ...data]);
    };
    getData("users", setUsers);
    getData("trips", setTrips);
  }, []);

  return (
    <>
      <Link to="/user">
        <Button variant="primary" className="mb-3">
          Add new user
        </Button>
      </Link>
      <Link to="/trip">
        <Button variant="primary" className="mb-3">
          Add new trip
        </Button>
      </Link>
      <Container>
        <Row>
          <Col>
            {users && (
              <>
                <Card.Title className="mb-3">All users:</Card.Title>
                {users.map((user) => (
                  <Link
                    to={`/user/${user.id}`}
                    className="text-decoration-none"
                  >
                    <InfoCard
                      key={user.id}
                      data={user}
                      keys={["name", "surname", "role"]}
                    />
                  </Link>
                ))}
              </>
            )}
          </Col>
          <Col>
            {trips && (
              <>
                <Card.Title className="mb-3">All trips:</Card.Title>
                {trips.map((trip) => (
                  <Link
                    to={`/trip/${trip.id}`}
                    className="text-decoration-none"
                  >
                    <InfoCard
                      key={trip.id}
                      data={trip}
                      keys={["from", "to", "passengerVolume", "plateNumber"]}
                    />{" "}
                  </Link>
                ))}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default UserProfile;
