import { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const UserProfile = () => {
  const [isOpenAddNew, setIsOpenAddNew] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");
  const roles = ["Driver", "Passenger", "Manager"];

  const addNewClickHandler = () => {
    !isOpenAddNew ? setIsOpenAddNew(true) : setIsOpenAddNew(false);
  };
  const checkboxOnchangeHandler = (e) => {
    setRole(e.target.value);
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      surname: surname,
      role: role,
    });
    console.log("Document written with ID: ", docRef.id);
  };
  return (
    <>
      {!isOpenAddNew && (
        <Button variant="primary" className="mb-3" onClick={addNewClickHandler}>
          Add new user
        </Button>
      )}
      {isOpenAddNew && (
        <Card style={{ width: "40rem" }}>
          <Form onSubmit={formSubmitHandler}>
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
              <label htmlFor="role">Choose role:</label>
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
                Add new user
              </Button>
            </Col>
          </Form>
        </Card>
      )}
    </>
  );
};
export default UserProfile;
