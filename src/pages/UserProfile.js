import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { query, getDocs } from "firebase/firestore";
import UserCard from "../components/UserCard";
import TripCard from "../components/TripCard";

const UserProfile = () => {
  const [isOpenAddNew, setIsOpenAddNew] = useState(false);
  const [isOpenNewTrip, setIsNewTrip] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [plateNum, setPlateNum] = useState("");
  const [passengerVolume, setPassengerVolume] = useState("");
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);

  const roles = ["Driver", "Passenger", "Manager"];

  const toggleState = (state, setState) => () => setState(!state);

  const addNewUserClickHandler = toggleState(isOpenAddNew, setIsOpenAddNew);

  const addNewTripClickHandler = toggleState(isOpenNewTrip, setIsNewTrip);

  const checkboxOnchangeHandler = (e) => {
    setRole(e.target.value);
  };
  const getData = async (collectionName, setState) => {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());
    setState((prev) => [...prev, ...data]);
  };
  useEffect(() => {
    getData("users", setUsers);
  }, []);
  useEffect(() => {
    getData("trips", setTrips);
  }, []);

  const handleSubmit = (collectionName, data, setState) => async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, collectionName), data);
    setState(false);
  };

  const addNewUserFormSubmitHandler = handleSubmit(
    "users",
    { name, surname, role },
    setIsOpenAddNew
  );

  const addNewTripFormSubmitHandler = handleSubmit(
    "trips",
    { from, to, plateNumber: plateNum, passengerVolume },
    setIsNewTrip
  );
  return (
    <>
      {!isOpenAddNew && (
        <Button
          variant="primary"
          className="mb-3"
          onClick={addNewUserClickHandler}
        >
          Add new user
        </Button>
      )}

      {!isOpenNewTrip && (
        <Button
          variant="primary"
          className="mb-3"
          onClick={addNewTripClickHandler}
        >
          Add new trip
        </Button>
      )}
      {users &&
        users.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            surname={user.surname}
            role={user.role}
          />
        ))}
      {trips &&
        trips.map((trip) => (
          <TripCard
            key={trip.id}
            from={trip.from}
            passengerVolume={trip.passengerVolume}
            plateNumber={trip.plateNumber}
            to={trip.to}
          ></TripCard>
        ))}
      {isOpenAddNew && (
        <Card style={{ width: "40rem" }}>
          <Form onSubmit={addNewUserFormSubmitHandler}>
            <Form.Group className="mb-3 p-2" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 p-2" controlId="formBasicSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter surname"
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>

            <Col className="p-1">
              <Form.Label>Choose role:</Form.Label>
              {roles.map((role) => (
                <Form.Check
                  type="radio"
                  name="role"
                  key={role}
                  value={role}
                  label={role}
                  onChange={checkboxOnchangeHandler}
                />
              ))}
              <Button variant="primary" type="submit" className="mb-3 mt-3">
                Add user
              </Button>
            </Col>
          </Form>
        </Card>
      )}
      {isOpenNewTrip && (
        <Form onSubmit={addNewTripFormSubmitHandler}>
          <Form.Group className="mb-3 p-2" controlId="formBasicFrom">
            <Form.Label>From:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter from"
              onChange={(e) => setFrom(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 p-2" controlId="formBasicSurname">
            <Form.Label>To:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter to"
              onChange={(e) => setTo(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 p-2" controlId="formBasicPlateNum">
            <Form.Label>Plate number:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter plate number"
              onChange={(e) => setPlateNum(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 p-2" controlId="formBasicPassengerVolume">
            <Form.Label>Passenger volume:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter passenger volume"
              onChange={(e) => setPassengerVolume(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-3 mt-3">
            Add trip
          </Button>
        </Form>
      )}
    </>
  );
};
export default UserProfile;
