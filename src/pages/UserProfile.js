import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import { query, getDocs } from "firebase/firestore";
import InfoCard from "../components/InfoCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { Navbar, Nav } from "react-bootstrap";
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
    <Container className="mx-auto m-5">
      <Row>
        <Col style={{ width: "250px" }}>
          {users && (
            <>
              <Stack direction="horizontal" className="mb-3">
                <Card.Title>All users:</Card.Title>
                <Link to="/user" className="ms-auto">
                  <Button variant="primary">Add new user</Button>
                </Link>
              </Stack>
              {users.map((user) => (
                <Link to={`/user/${user.id}`} className="text-decoration-none">
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
        <Col style={{ width: "250px" }}>
          {trips && (
            <>
              <Stack direction="horizontal" className="mb-3">
                <Card.Title>All trips:</Card.Title>
                <Link to="/trip" className="ms-auto">
                  <Button variant="primary" className="">
                    Add new trip
                  </Button>
                </Link>
              </Stack>
              {trips.map((trip) => (
                <Link to={`/trip/${trip.id}`} className="text-decoration-none">
                  <InfoCard
                    key={trip.id}
                    data={trip}
                    keys={["from", "to", "passengerVolume", "plateNumber"]}
                  />
                </Link>
              ))}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default UserProfile;
