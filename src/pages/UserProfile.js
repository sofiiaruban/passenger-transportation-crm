import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import { query, getDocs } from "firebase/firestore";
import InfoCard from "../components/InfoCard";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [isEditUsers, setIsEditUsers] = useState(false);
  const [isEditTrips, setIsEditTrips] = useState(false);
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

  const clickHandler = (state, setState) => {
    setState(!state);
  };
  return (
    <>
      <Navbar
        bg="light"
        expand="xxl"
        className="d-flex justify-content-between"
      >
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="mb-2"
            onClick={() => {
              setIsEditUsers(false);
              setIsEditTrips(false);
            }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link
                onClick={() => clickHandler(isEditUsers, setIsEditUsers)}
              >
                Edit users
              </Nav.Link>
              <Nav.Link
                onClick={() => clickHandler(isEditTrips, setIsEditTrips)}
              >
                Edit trips
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isEditUsers && (
        <Container className="mx-auto m-5" style={{ width: "30rem" }}>
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
        </Container>
      )}
      {isEditTrips && (
        <Container className="mx-auto m-5" style={{ width: "30rem" }}>
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
        </Container>
      )}
    </>
  );
};
export default UserProfile;
{
  /*           <Col style={{ width: "250px" }}>
   */
}
